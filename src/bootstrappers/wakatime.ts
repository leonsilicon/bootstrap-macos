import * as path from 'path';
import * as os from 'os';
import * as fs from 'node:fs';
import zshBootstrapper from '~/bootstrappers/zsh.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { runCommand } from '~/utils/command.js';
import { promptInput } from '~/utils/prompt.js';

export const wakatimeBootstrapper = createBootstrapper({
	name: 'Wakatime',
	async bootstrap(context) {
		await zshBootstrapper.bootstrap(context);

		const wakatimeApiKey = await promptInput(context, {
			message: 'Please enter your Wakatime API Key',
			password: true,
		});

		if (!context.dryRun) {
			await fs.promises.writeFile(
				path.join(os.homedir(), '.wakatime.cfg'),
				wakatimeApiKey
			);
		}

		await runCommand(context, {
			description: 'Installing Wakatime terminal plugin for zsh',
			link: 'https://wakatime.com/terminal',
			command:
				'git clone https://github.com/sobolevn/wakatime-zsh-plugin.git wakatime',
			cwd: path.join(os.homedir(), '.oh-my-zsh'),
		});

		// todo: install wakatime extensions for various programs
	},
});
