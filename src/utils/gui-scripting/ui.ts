import { outdent } from 'outdent';
import type { ElementReference } from '~/types/element-path.js';
import { runAppleScript } from '~/utils/applescript.js';
import { createElementReferences } from '~/utils/gui-scripting/element-path.js';

export async function getUIElements(
	processName: string
): Promise<ElementReference[]> {
	const elements = createElementReferences(
		(await runAppleScript(outdent`
			tell application "System Events"
			  tell front window of process ${JSON.stringify(processName)}
			    get entire contents
			  end tell
			end tell
		`)) as string[]
	);

	return elements;
}

export async function clickElement(elementReference: ElementReference) {
	await runAppleScript(outdent`
		tell application "System Events"
			tell process ${elementReference.applicationProcess}
				set myElement to a reference to ${elementReference.pathString}
				click myElement
			end tell
		end tell
	`);
}
