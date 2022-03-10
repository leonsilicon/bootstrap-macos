import { outdent } from 'outdent';
import type { BootstrapperContext } from '~/types/context.js';
import type { ElementReference } from '~/types/element-path.js';
import { runAppleScript } from '~/utils/applescript.js';

type ToggleCheckboxProps = {
	element: ElementReference;
	value?: boolean;
};
export async function toggleCheckbox(
	context: BootstrapperContext,
	props: ToggleCheckboxProps
) {
	let checkboxAction: string;
	switch (props.value) {
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

	await runAppleScript(
		context,
		outdent`
			tell application "System Events" to tell process ${props.element.applicationProcess}
				set theCheckbox to ${props.element.pathString}
				tell theCheckbox
					${checkboxAction}
				end tell
			end tell
		`
	);
}
