import { runCommand } from '~/utils/command.js';

runCommand({
	description: 'Installs Homebrew',
	link: 'https://brew.sh',
	command:
		'/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
	shell: true,
});