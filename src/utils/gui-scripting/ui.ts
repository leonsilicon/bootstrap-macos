import { outdent } from 'outdent';
import type { BootstrapperContext } from '~/types/context.js';
import type { ElementReference } from '~/types/element-path.js';
import { runAppleScript } from '~/utils/applescript.js';
import { createElementReferences } from '~/utils/gui-scripting/element-path.js';

export async function getElements(
	context: BootstrapperContext,
	processName: string
): Promise<ElementReference[]> {
	const elements = createElementReferences(
		(await runAppleScript(
			context,
			outdent`
				tell application "System Events"
				  tell front window of process ${JSON.stringify(processName)}
				    get entire contents
				  end tell
				end tell
			`
		)) as string[]
	);

	return elements;
}

export async function clickElement(
	context: BootstrapperContext,
	element: ElementReference
) {
	await runAppleScript(
		context,
		outdent`
			tell application "System Events"
				tell process ${element.applicationProcess}
					set myElement to a reference to ${element.pathString}
					click myElement
				end tell
			end tell
		`
	);
}
