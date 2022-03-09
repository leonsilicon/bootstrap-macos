import { outdent } from 'outdent';
import { runAppleScript } from 'run-applescript';

export function parseUIElements(uiElementsDump: string) {
	let currentElementWords: string[] = [];
	const elements: string[] = [];
	const words = uiElementsDump.replaceAll('\n', ' ').split(' ');

	let applicationProcessEncountered = false;

	currentElementWords.push(words[0]!);
	for (let i = 1; i < words.length; i += 1) {
		const prevWord = words[i - 1]!;
		const curWord = words[i]!;

		if (applicationProcessEncountered && curWord.endsWith(',')) {
			currentElementWords.push(curWord.slice(0, -1));
			elements.push(currentElementWords.join(' '));
			currentElementWords = [];
			applicationProcessEncountered = false;

			continue;
		}

		if (prevWord === 'application' && curWord === 'process') {
			applicationProcessEncountered = true;
		}

		currentElementWords.push(curWord);
	}

	elements.push(currentElementWords.join(' '));

	return elements;
}

export async function getUIElements(processName: string) {
	const output = await runAppleScript(outdent`
		tell application "System Events"
		  tell front window of process ${JSON.stringify(processName)}
		    set uiElements to entire contents as list
		  end tell
		end tell
		return uiElements
	`);

	return parseUIElements(output);
}
