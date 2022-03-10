import * as path from 'node:path';
import * as fs from 'node:fs';
import { brewInstall } from '~/utils/brew.js';
import { getDotConfigFolderPath } from '~/utils/config.js';

// https://github.com/yqrashawn/GokuRakuJoudo
export async function installGokuRakuJoudo() {
	await brewInstall('yqrashawn/goku/goku');
	const dotConfigFolderPath = await getDotConfigFolderPath();
	await fs.promises.writeFile(
		path.join(dotConfigFolderPath, 'karabiner.edn'),
		'{:main []}'
	);
}
