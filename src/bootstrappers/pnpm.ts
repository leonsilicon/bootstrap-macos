import { createBootstrapper } from '~/utils/bootstrapper.js';
import { commandExists, runCommand } from '~/utils/command.js';

export const pnpmBootstrapper = createBootstrapper({
	async skip() {
		return commandExists('pnpm');
	},
	async bootstrap() {
		await runCommand({
			description: 'Install pnpm',
			command: 'curl -fsSL https://get.pnpm.io/install.sh | sh -',
			shell: true,
		});

		await runCommand({
			description: 'Install Node via pnpm',
			command: 'pnpm env --global use lts',
		});
	},
});
