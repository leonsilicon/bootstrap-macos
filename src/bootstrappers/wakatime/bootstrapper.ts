import * as path from 'node:path';
import * as os from 'node:os';
import * as fs from 'node:fs';
import zshBootstrapper from '~/bootstrappers/zsh/bootstrapper.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { promptInput } from '~/utils/prompt.js';
import { addOhMyZshPlugin } from '~/utils/zsh.js';

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

		await addOhMyZshPlugin(context, {
			pluginName: 'wakatime',
			repository: 'sobolevn/wakatime-zsh-plugin',
		});

		// todo: install wakatime extensions for various programs
	},
});

export default wakatimeBootstrapper;
