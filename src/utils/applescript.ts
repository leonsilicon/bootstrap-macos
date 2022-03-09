import { execa } from 'execa';
import { parseAppleScript } from 'parse-applescript';

export async function runAppleScript(script: string) {
	const { stdout } = await execa('osascript', ['-ss', '-e', script]);

	return parseAppleScript(stdout);
}
