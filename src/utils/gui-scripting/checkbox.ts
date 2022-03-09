import { outdent } from 'outdent';
import type { ElementReference } from '~/types/element-path.js';
import { runAppleScript } from '~/utils/applescript.js';

export async function toggleCheckbox(
	elementReference: ElementReference,
	value?: boolean
) {
	let checkboxAction: string;
	switch (value) {
		case true:
			// If checkbox is not checked, then check it
			checkboxAction = 'if not (its value as boolean) then click theCheckbox';
			break;
		case false:
			checkboxAction = 'if (its value as boolean) then click theCheckbox';
			break;
		default:
			checkboxAction = 'click theCheckbox';
	}

	await runAppleScript(outdent`
		tell application "System Events" to tell process ${elementReference.applicationProcess}
			set theCheckbox to ${elementReference.pathString}
			tell theCheckbox
				${checkboxAction}
			end tell
		end tell
	`);
}
