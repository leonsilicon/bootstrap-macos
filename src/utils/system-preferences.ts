import { outdent } from 'outdent';
import pWaitFor from 'p-wait-for';
import type { ElementReference } from '~/types/element-path.js';
import { runAppleScript } from '~/utils/applescript.js';
import { toggleCheckbox } from '~/utils/gui-scripting/checkbox.js';
import { createElementReferences } from '~/utils/gui-scripting/element-path.js';
import { clickElement, getUIElements } from '~/utils/gui-scripting/ui.js';
import {
	waitForElementExists,
	waitForElementHidden,
	waitForWindow,
} from '~/utils/gui-scripting/window.js';
import { promptAdminCredentials } from '~/utils/prompt.js';

// https://apple.stackexchange.com/questions/422165/applescript-system-preferences-automation
export async function reopenSystemPreferences() {
	await runAppleScript(outdent`
		-- Check to see if System Preferences is
		-- running and if yes, then close it.
		--
		-- This is done so the script will not fail
		-- if it is running and a modal sheet is
		-- showing, hence the use of 'killall'
		-- as 'quit' fails when done so, if it is.
		--
		-- This is also done to allow default behaviors
		-- to be predictable from a clean occurrence.

		if running of application "System Preferences" then
			try
				tell application "System Preferences" to quit
			on error
				do shell script "killall 'System Preferences'"
			end try
			delay 0.1
		end if

		-- Make sure System Preferences is not running before
		-- opening it again. Otherwise there can be an issue
		-- when trying to reopen it while it's actually closing.

		repeat while running of application "System Preferences" is true
			delay 0.1
		end repeat
	`);
}

const paneIdToName = {
	'com.apple.preference.security': 'Privacy & Security',
	'com.apple.preference.trackpad': 'Trackpad',
} as const;

const paneAnchors = {
	General: 'General',
	Privacy: 'Privacy',
} as const;

type OpenSystemPreferencesPaneProps = {
	paneId: keyof typeof paneIdToName;
	anchor?: keyof typeof paneAnchors;
};
export async function openSystemPreferencesPane({
	paneId,
	anchor,
}: OpenSystemPreferencesPaneProps) {
	await runAppleScript(outdent`
		tell application "System Preferences"
			activate
			reveal pane id ${JSON.stringify(paneId)}
			${anchor === undefined ? '' : JSON.stringify(anchor)}
		end tell
	`);

	await waitForWindow({
		windowName: paneIdToName[paneId],
		processName: 'System Preferences',
	});
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
	await openSystemPreferencesPane({
		paneId: 'com.apple.preference.security',
		anchor: 'Privacy',
	});

	let uiElements = createElementReferences(
		(await runAppleScript(outdent`
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
		`)) as string[]
	);

	const lockButton = uiElements.find((uiElement) =>
		uiElement.path.some(
			(part) => part.name === 'Click the lock to make changes.'
		)
	);

	if (lockButton === undefined) {
		throw new Error('Lock button not found.');
	}

	await clickElement(lockButton);

	const { username, password } = await promptAdminCredentials();

	uiElements = [];
	const authSheet = await pWaitFor<ElementReference>(async (resolve) => {
		uiElements = await getUIElements('System Preferences');
		const authSheet = uiElements.find((element) =>
			element.path.some((part) => part.fullName === 'sheet 1')
		);
		return authSheet ? resolve(authSheet) : false;
	});

	await waitForElementExists({
		elementReference: authSheet,
	});

	await runAppleScript(outdent`
		tell application "System Events"
			keystroke ${JSON.stringify(username)}
			keystroke tab
			delay 0.5
			keystroke ${JSON.stringify(password)}
			key code 36
		end tell
	`);

	await waitForElementHidden({
		elementReference: authSheet,
	});

	const appCheckbox = uiElements.find(
		(uiElement) =>
			uiElement.path.some((part) => part.type === 'checkbox') &&
			uiElement.path.some((part) => part.name.includes(appName))
	);

	if (appCheckbox === undefined) {
		throw new Error(`Permissions checkbox for app ${appName} not found.`);
	}

	await toggleCheckbox(appCheckbox, true);
}

/**
Whenever software is blocked from loading (e.g. unidentified developer)
*/
export async function allowSystemSoftware() {
	await reopenSystemPreferences();
	await openSystemPreferencesPane({
		paneId: 'com.apple.preference.security',
		anchor: 'General',
	});
	const uiElements = await getUIElements('System Preferences');
	const allowButton = uiElements.find((uiElement) =>
		uiElement.path.some(
			(part) =>
				part.type === 'button' &&
				(part.name === 'Allow' || part.name === 'Open Anyway')
		)
	);

	if (allowButton === undefined) {
		throw new Error(`Click button for system software was undefined.`);
	}

	await clickElement(allowButton);
}
