import { createBootstrapper } from '~/utils/bootstrapper.js';
import { runCommand } from '~/utils/command.js';

export const gitBoostrapper = createBootstrapper({
	async bootstrap() {
		await runCommand(context, {
			description: 'Set git default branch to main',
			command: 'git config --global init.defaultBranch main',
		});

		await runCommand({
			description: 'Set git pull configuration',
			command: 'git config pull.rebase true',
		});
	},
});
