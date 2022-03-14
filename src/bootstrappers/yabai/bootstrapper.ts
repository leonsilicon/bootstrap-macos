import * as fs from 'node:fs';
import * as path from 'node:path';
import mkdirp from 'mkdirp';
import { pnpmBootstrapper } from '~/bootstrappers/pnpm/pnpm.js';
import { commandExists, runCommand } from '~/utils/command.js';
import { getDotConfigFolderPath } from '~/utils/config.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { promptYesNo } from '~/utils/prompt.js';

export const yabaiBootstrapper = createBootstrapper({
	name: 'yabai',
	async skip(context) {
		return commandExists(context, 'yabai');
	},
	async bootstrap(context) {
		if (
			await promptYesNo(context, {
				message:
					'Do you want to install the yabai-master-stack-plugin that enables dwm-style master-stack layouts in Yabai?',
			})
		) {
			await pnpmBootstrapper.bootstrap(context);

			const dotConfigFolderPath = await getDotConfigFolderPath();
			await runCommand(context, {
				command: 'pnpm install --global yabai-master-stack-plugin',
			});

			const { stdout: yabaiPath } = await runCommand(context, {
				command: 'which yabai',
			});
			const ymspConfig = {
				yabaiPath,
			};

			if (!context.dryRun) {
				const ymspConfigFolder = path.join(dotConfigFolderPath, 'ymsp');
				await mkdirp(ymspConfigFolder);
				await fs.promises.writeFile(
					path.join(ymspConfigFolder, 'ymsp.config.json'),
					JSON.stringify(ymspConfig)
				);
			}
		}
	},
});

export default yabaiBootstrapper;
