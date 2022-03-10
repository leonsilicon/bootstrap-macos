import { createBootstrapper } from '~/utils/bootstrapper.js';
import { runCommand } from '~/utils/command.js';

export const commandLineToolsBootstrapper = createBootstrapper({
	async bootstrap() {
		await runCommand({
			description: 'Installs XCode developer tools.',
			link: 'https://www.freecodecamp.org/news/install-xcode-command-line-tools/',
			command: 'xcode-select --install',
		});
	},
});
