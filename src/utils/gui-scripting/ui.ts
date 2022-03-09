import { outdent } from 'outdent';
import { runAppleScript } from 'run-applescript';

export async function getUIElements(processName: string) {
	const output = await runAppleScript(outdent`
		tell application "System Events"
		  tell front window of process ${JSON.stringify(processName)}
		    get entire contents
		  end tell
		end tell
	`);

	return output.split(', ');
}
