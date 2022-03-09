import { outdent } from 'outdent';
import type { ElementReference } from '~/types/element-path.js';
import { runAppleScript } from '~/utils/applescript.js';

type WaitForWindowProps = {
	windowName: string;
	processName: string;
	numAttempts?: number;

	/**
	 * Interval to wait for before trying again in seconds (default 0.1)
	 */
	interval?: number;
};
export async function waitForWindow({
	windowName,
	processName,
	numAttempts = 30,
	interval = 0.1,
}: WaitForWindowProps) {
	await runAppleScript(outdent`
		tell application "System Events"
			set i to 0
			repeat until exists window ${JSON.stringify(
				windowName
			)} of application process ${JSON.stringify(processName)}
				delay ${interval}
				set i to i + 1
				if i ≥ ${numAttempts} then return
			end repeat
		end tell
	`);
}

type WaitForElementProps = {
	elementReference: ElementReference;
	interval?: number;
};
export async function waitForElementExists({
	elementReference,
	interval = 0.1,
}: WaitForElementProps) {
	await runAppleScript(outdent`
		tell application "System Events"
			tell process ${JSON.stringify(elementReference.applicationProcess)}
					repeat until exists ${elementReference}
							delay ${interval}
					end repeat
			end tell
		end tell
	`);
}

type WaitForElementHiddenProps = {
	elementReference: ElementReference;
	interval?: number;
};
export async function waitForElementHidden({
	elementReference,
	interval = 0.1,
}: WaitForElementHiddenProps) {
	await runAppleScript(outdent`
		tell application "System Events"
			tell process ${JSON.stringify(elementReference.applicationProcess)}
					repeat while exists ${elementReference}
							delay ${interval}
					end repeat
			end tell
		end tell
	`);
}
