import * as os from 'node:os';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { runCommands } from '~/utils/command.js';

export const macosConfigsBootstrapper = createBootstrapper({
	name: 'Custom macOS Configs',
	async bootstrap(context) {
		await runCommands(context, {
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
	},
});

export default macosConfigsBootstrapper;
