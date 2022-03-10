import { createBootstrapper } from '~/utils/bootstrapper.js';
import { runCommand } from '~/utils/command.js';

export const homebrewBootstrapper = createBootstrapper({
	name: 'Homebrew',
	async bootstrap(context) {
		await runCommand(context, {
			description: 'Installs Homebrew',
			link: 'https://brew.sh',
			command:
				'/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
			shell: true,
		});

		await runCommand(context, {
			description: 'Installs brew-file',
			link: 'https://homebrew-file.readthedocs.io/en/latest/installation.html',
			command: 'brew install rcmdnk/file/brew-file',
		});

		await runCommand(context, {
			description: 'Installs all packages specified in Brewfile',
			command: 'brew-file install',
		});
	},
});

export default homebrewBootstrapper;
