import { homebrewBootstrapper } from '~/bootstrappers/homebrew/bootstrapper.js';
import type { BootstrapperContext } from '~/types/context.js';
import { runCommand } from '~/utils/command.js';

export async function brewInstall(
	context: BootstrapperContext,
	pkg: string,
	options: { cask?: boolean } = {}
) {
	// Ensure brew is installed
	await homebrewBootstrapper.bootstrap(context);

	if (options.cask) {
		await runCommand(context, {
			description: `Installing cask ${pkg} with Homebrew`,
			command: ['brew', 'install', '--cask', pkg],
		});
	} else {
		await runCommand(context, {
			description: `Installing ${pkg} with Homebrew`,
			command: ['brew', 'install', pkg],
		});
	}
}
