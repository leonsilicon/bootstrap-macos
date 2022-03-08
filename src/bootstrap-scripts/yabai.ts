import * as fs from 'node:fs';
import * as path from 'node:path';
import mkdirp from 'mkdirp';
import { installPnpm } from '~/bootstrap-scripts/pnpm.js';
import { runCommand } from '~/utils/command.js';
import { getDotConfigFolderPath } from '~/utils/config.js';

export async function installYabai() {
	// TODO

	const installMasterStackPlugin = true;
	if (installMasterStackPlugin) {
		await installPnpm();

		const dotConfigFolderPath = await getDotConfigFolderPath();
		runCommand({
			command: 'pnpm install --global yabai-master-stack-plugin',
		});

		const ymspConfig = {
			yabaiPath: runCommand({ command: 'which yabai' }).stdout,
		};

		const ymspConfigFolder = path.join(dotConfigFolderPath, 'ymsp');
		await mkdirp(ymspConfigFolder);
		await fs.promises.writeFile(
			path.join(ymspConfigFolder, 'ymsp.config.json'),
			JSON.stringify(ymspConfig)
		);
	}
}
