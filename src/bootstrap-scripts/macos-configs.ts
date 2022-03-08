import * as os from 'node:os';
import { runCommand } from '~/utils/command.js';

runCommand({
	description: 'Install personal macOS configs.',
	installLink: 'https://github.com/leonzalion/macos-configs#readme',
	command:
		'git init && git remote add origin https://github.com/leonzalion/macos-configs && git pull origin main',
	cwd: os.homedir(),
});

// Change keyboard layout to Programmer Dvorak
