import { runAppleScript } from 'run-applescript';
import { outdent } from 'outdent';

// https://apple.stackexchange.com/questions/422165/applescript-system-preferences-automation
export async function reopenSystemPreferences() {
	await runAppleScript(outdent`
		--  # Check to see if System Preferences is
		--  # running and if yes, then close it.
		--  #
		--  # This is done so the script will not fail
		--  # if it is running and a modal sheet is
		--  # showing, hence the use of 'killall'
		--  # as 'quit' fails when done so, if it is.
		--  #
		--  # This is also done to allow default behaviors
		--  # to be predictable from a clean occurrence.

		if running of application "System Preferences" then
				try
						tell application "System Preferences" to quit
				on error
						do shell script "killall 'System Preferences'"
				end try
				delay 0.1
		end if

		--  # Make sure System Preferences is not running before
		--  # opening it again. Otherwise there can be an issue
		--  # when trying to reopen it while it's actually closing.

		repeat while running of application "System Preferences" is true
				delay 0.1
		end repeat
	`);
}

const paneIdToName = {
	'com.apple.preference.security': 'Privacy & Security',
};

export async function openSystemPreferencesPane(
	paneId: keyof typeof paneIdToName
) {
	await runAppleScript(outdent`
		tell application "System Preferences"
			activate
			reveal pane id ${JSON.stringify(paneId)}
		end tell

		tell application "System Events"
			set i to 0
			repeat until exists window ${JSON.stringify(
				paneIdToName[paneId]
			)} of application process "System Preferences"
				delay 0.1
				set i to i + 1
				if i ≥ 30 then return
			end repeat
		end tell
	`);
}

type GiveAppPermissionAccessProps = {
	appName: string;
	permissionName: string;
};
export async function giveAppPermissionAccess({
	appName,
	permissionName,
}: GiveAppPermissionAccessProps) {
	await reopenSystemPreferences();
	await openSystemPreferencesPane('com.apple.preference.security');

	const securityPrivacyPaneContents = await runAppleScript(outdent`
		tell application "System Events"
			-- Focus on the sidebar
			keystroke tab

			delay 0.5

			-- Selecting the Permission we need by typing out its name
			keystroke ${JSON.stringify(permissionName)}

			-- Retrieving all elements in the window
			-- TODO: this could probably be optimized to get it only for the list of apps but I'm lazy
			tell process "System Preferences"
				get entire contents
			end tell
		end tell
	`);

	console.log(securityPrivacyPaneContents);
}
