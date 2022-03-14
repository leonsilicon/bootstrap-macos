import * as fs from 'node:fs';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { getCodeFolderPath } from '~/utils/paths.js';

export const codeFolderBootstrapper = createBootstrapper({
	name: '~/code folder',
	async bootstrap(context) {
		if (!context.dryRun) {
			const codeFolderPath = getCodeFolderPath();
			if (!fs.existsSync(codeFolderPath)) {
				await fs.promises.mkdir(codeFolderPath, { recursive: true });
			}
		}
	},
});

export default codeFolderBootstrapper;
