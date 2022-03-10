import * as fs from 'node:fs';
import * as path from 'node:path';
import { brewInstall } from '~/utils/brew.js';
import { getDotConfigFolderPath } from '~/utils/config.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';

export const gokuRakuJoudoBootstrapper = createBootstrapper({
	name: 'GokuRakuJoudo',
	async bootstrap(context) {
		// https://github.com/yqrashawn/GokuRakuJoudo
		await brewInstall(context, 'yqrashawn/goku/goku');
		const dotConfigFolderPath = await getDotConfigFolderPath();
		const karabinerEdnPath = path.join(dotConfigFolderPath, 'karabiner.edn');

		if (!context.dryRun && !fs.existsSync(karabinerEdnPath)) {
			await fs.promises.writeFile(karabinerEdnPath, '{:main []}');
		}
	},
});

export default gokuRakuJoudoBootstrapper;
