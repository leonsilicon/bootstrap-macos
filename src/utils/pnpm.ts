import pnpmBootstrapper from '~/bootstrappers/pnpm/bootstrapper.js';
import type { BootstrapperContext } from '~/types/context.js';
import { runCommand } from '~/utils/command.js';

export async function pnpmInstall(
	context: BootstrapperContext,
	packageName: string
) {
	await pnpmBootstrapper.bootstrap(context);
	await runCommand(context, {
		description: `Installing ${packageName} with pnpm`,
		link: 'https://github.com/leonzalion/latex-workflow#readme',
		command: ['pnpm', 'install', '--global', packageName],
	});
}
