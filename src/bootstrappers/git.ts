import { createBootstrapper } from '~/utils/bootstrapper.js';
import { runCommand } from '~/utils/command.js';

export const gitBootstrapper = createBootstrapper({
	name: 'git',
	async bootstrap(context) {
		await runCommand(context, {
			description: 'Set git default branch to main',
			command: 'git config --global init.defaultBranch main',
		});

		await runCommand(context, {
			description: 'Set git pull configuration',
			command: 'git config pull.rebase true',
		});

		await brewInstall(context, 'git-subrepo');
	},
});

export default gitBootstrapper;
