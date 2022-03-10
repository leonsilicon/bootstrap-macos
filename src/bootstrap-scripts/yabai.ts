import * as fs from 'node:fs';
import * as path from 'node:path';
import mkdirp from 'mkdirp';
import { pnpmBootstrapper } from '~/bootstrap-scripts/pnpm.js';
import { commandExists, runCommand } from '~/utils/command.js';
import { getDotConfigFolderPath } from '~/utils/config.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { promptYesNo } from '~/utils/prompt.js';

export const yabaiBootstrapper = createBootstrapper({
	async skip() {
		return commandExists('yabai');
	},
	async bootstrap() {
		if (
			await promptYesNo({
				message:
					'Do you want to install the yabai-master-stack-plugin that enables dwm-style master-stack layouts in Yabai?',
			})
		) {
			await pnpmBootstrapper.bootstrap();

			const dotConfigFolderPath = await getDotConfigFolderPath();
			await runCommand({
				command: 'pnpm install --global yabai-master-stack-plugin',
			});

			const { stdout: yabaiPath } = await runCommand({
				command: 'which yabai ',
			});
			const ymspConfig = {
				yabaiPath,
			};

			const ymspConfigFolder = path.join(dotConfigFolderPath, 'ymsp');
			await mkdirp(ymspConfigFolder);
			await fs.promises.writeFile(
				path.join(ymspConfigFolder, 'ymsp.config.json'),
				JSON.stringify(ymspConfig)
			);
		}
	},
});
