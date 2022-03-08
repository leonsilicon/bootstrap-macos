import { runCommand } from '~/utils/command.js';

runCommand({
	description: 'Installs XCode developer tools.',
	installLink:
		'https://www.freecodecamp.org/news/install-xcode-command-line-tools/',
	command: 'xcode-select --install',
});
