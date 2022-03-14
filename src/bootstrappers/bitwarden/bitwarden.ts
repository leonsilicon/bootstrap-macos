import pnpmBootstrapper from '~/bootstrappers/pnpm.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { runCommand } from '~/utils/command.js';

export const bitwardenBootstrapper = createBootstrapper({
	name: 'Bitwarden',
	async bootstrap(context) {
		await pnpmBootstrapper.bootstrap(context);

		await runCommand(context, {
			link: 'https://github.com/bitwarden/cli#downloadinstall',
			description: 'Installing Bitwarden CLI',
			command: 'pnpm install --global @bitwarden/cli',
		});

		// todo: install cli and browser extension
	},
});

export default bitwardenBootstrapper;
