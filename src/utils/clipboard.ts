import type { BootstrapperContext } from '~/types/context.js';
import { runCommand } from '~/utils/command.js';

export async function copyToClipboard(
	context: BootstrapperContext,
	text: string
) {
	await runCommand(context, {
		command: 'pbcopy',
		input: text,
	});
}
