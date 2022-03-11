import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';
import { runCommand } from '~/utils/command.js';

export const pipxBootstrapper = createBootstrapper({
	name: 'pipx',
	async bootstrap(context) {
		await brewInstall(context, 'pipx');
		await runCommand(context, {
			link: 'https://pypa.github.io/pipx/installation/',
			command: 'pipx ensurepath',
		});
	},
});
