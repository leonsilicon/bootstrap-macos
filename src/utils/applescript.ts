import { parseAppleScript } from 'parse-applescript';
import type { BootstrapperContext } from '~/types/context.js';
import { runCommand } from '~/utils/command.js';

export async function runAppleScript(
	context: BootstrapperContext,
	script: string
) {
	if (context.dryRun) {
		return undefined;
	}

	const { stdout } = await runCommand(context, {
		command: ['osascript', '-ss', '-e', script],
	});

	return parseAppleScript(stdout);
}
