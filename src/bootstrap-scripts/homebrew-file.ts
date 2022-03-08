import { runCommand } from '~/utils/command.js';

runCommand({
	description: 'Installs brew-file',
	installLink:
		'https://homebrew-file.readthedocs.io/en/latest/installation.html',
	command: 'brew install rcmdnk/file/brew-file',
});

runCommand({
	description: 'Installs all packages specified in Brewfile',
	command: 'brew-file install',
});
