import * as path from 'node:path';
import * as fs from 'node:fs';
import { brewInstall } from '~/utils/brew.js';
import { getDotConfigFolderPath } from '~/utils/config.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';

export const gokuRakuJoudoBootstrapper = createBootstrapper({
	async bootstrap() {
		// https://github.com/yqrashawn/GokuRakuJoudo
		await brewInstall('yqrashawn/goku/goku');
		const dotConfigFolderPath = await getDotConfigFolderPath();
		const karabinerEdnPath = path.join(dotConfigFolderPath, 'karabiner.edn');
		if (!fs.existsSync(karabinerEdnPath)) {
			await fs.promises.writeFile(karabinerEdnPath, '{:main []}');
		}
	},
});
