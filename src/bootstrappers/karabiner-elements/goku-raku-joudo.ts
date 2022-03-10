import * as path from 'node:path';
import { brewInstall } from '~/utils/brew.js';
import { getDotConfigFolderPath } from '~/utils/config.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';

export const gokuRakuJoudoBootstrapper = createBootstrapper({
	async bootstrap(context) {
		// https://github.com/yqrashawn/GokuRakuJoudo
		await brewInstall('yqrashawn/goku/goku');
		const dotConfigFolderPath = await getDotConfigFolderPath();
		const karabinerEdnPath = path.join(dotConfigFolderPath, 'karabiner.edn');
		if (!context.fs.existsSync(karabinerEdnPath)) {
			await context.fs.promises.writeFile(karabinerEdnPath, '{:main []}');
		}
	},
});
