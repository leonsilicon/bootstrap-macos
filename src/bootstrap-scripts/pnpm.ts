import commandExists from 'command-exists';
import { runCommand } from '~/utils/command.js';

export async function installPnpm(force?: boolean) {
	if (!force && (await commandExists('pnpm'))) {
		return;
	}

	runCommand({
		description: 'Install pnpm',
		command: 'curl -fsSL https://get.pnpm.io/install.sh | sh -',
		shell: true,
	});

	runCommand({
		description: 'Install Node via pnpm',
		command: 'pnpm env --global use lts',
	});
}
