import * as os from 'node:os';
import { runCommands } from '~/utils/command.js';

runCommands({
	description: 'Install personal macOS configs.',
	link: 'https://github.com/leonzalion/macos-configs#readme',
	commands: [
		'git init',
		'git remote add origin https://github.com/leonzalion/macos-configs',
		'git pull origin main',
	],
	cwd: os.homedir(),
});

// Change keyboard layout to Programmer Dvorak
