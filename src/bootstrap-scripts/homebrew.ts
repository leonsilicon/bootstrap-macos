import { runCommand } from '~/utils/command.js';

runCommand({
	description: 'Installs Homebrew',
	installLink: 'https://brew.sh',
	command:
		'/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
	shell: true,
});

runCommand({
	description: 'Installs brew-file',
	installLink:
		'https://homebrew-file.readthedocs.io/en/latest/installation.html',
	command: 'brew install rcmdnk/file/brew-file',
});
