import { createBootstrapper } from '~/utils/bootstrapper.js';
import { runCommand } from '~/utils/command.js';

export const homebrewBootstrapper = createBootstrapper({
	async bootstrap() {
		await runCommand({
			description: 'Installs Homebrew',
			link: 'https://brew.sh',
			command:
				'/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
			shell: true,
		});

		await runCommand({
			description: 'Installs brew-file',
			link: 'https://homebrew-file.readthedocs.io/en/latest/installation.html',
			command: 'brew install rcmdnk/file/brew-file',
		});

		await runCommand({
			description: 'Installs all packages specified in Brewfile',
			command: 'brew-file install',
		});
	},
});
