import { createBootstrapper } from '~/utils/bootstrapper.js';
import { commandExists, runCommand } from '~/utils/command.js';

export const pnpmBootstrapper = createBootstrapper({
	async skip(context) {
		return commandExists(context, 'pnpm');
	},
	async bootstrap(context) {
		await runCommand(context, {
			description: 'Install pnpm',
			command: 'curl -fsSL https://get.pnpm.io/install.sh | sh -',
			shell: true,
		});

		await runCommand(context, {
			description: 'Install Node via pnpm',
			command: 'pnpm env --global use lts',
		});
	},
});
