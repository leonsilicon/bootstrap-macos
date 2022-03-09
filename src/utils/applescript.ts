import { execa } from 'execa';
import { parseAppleScript } from '~/utils/applescript-parser.js';

export async function runAppleScript(script: string) {
	const { stdout } = await execa('osascript', ['-s', 's', '-e', script]);
	console.log(stdout);

	return parseAppleScript(stdout);
}
