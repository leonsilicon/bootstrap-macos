import type { BootstrapperContext } from '~/types/context.js';
import { runCommand } from '~/utils/command.js';

export async function pipInstall(
	context: BootstrapperContext,
	packageName: string
) {
	await runCommand(context, {
		command: ['pip', 'install', packageName],
	});
}
