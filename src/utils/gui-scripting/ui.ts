import { outdent } from 'outdent';
import { runAppleScript } from '~/utils/applescript.js';

export async function getUIElements(processName: string) {
	const elements = await runAppleScript(outdent`
		tell application "System Events"
		  tell front window of process ${JSON.stringify(processName)}
		    get entire contents
		  end tell
		end tell
	`);

	return elements;
}

export async function clickElement(elementPath: string) {
	await runAppleScript(outdent`
		tell application "System Events"
			set myElement to a reference to ${elementPath}
			click myElement
		end tell
	`);
}
