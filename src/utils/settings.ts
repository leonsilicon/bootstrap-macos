import { runAppleScript } from 'run-applescript';
import { outdent } from 'outdent';
import type { ValueOf } from 'type-fest';
import type { SPPaneAnchors, SPPanes } from '~generated/system-preferences.js';

export async function openSystemPreferences<
	Pane extends ValueOf<keyof typeof SPPanes>
>({
	pane,
	anchor,
}: {
	pane: Pane;
	anchor: ValueOf<typeof SPPaneAnchors[Pane]>;
}) {
	// from https://stackoverflow.com/a/19197408
	await runAppleScript(outdent`
		tell application "System Preferences"
			-- get a reference to the Security & Privacy preferences pane
			set securityPane to pane id ${JSON.stringify(pane)}

			tell securityPane to reveal anchor ${JSON.stringify(anchor)}

			-- open the preferences window and make it frontmost
			activate
		end tell
	`);
}
