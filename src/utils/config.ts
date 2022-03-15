import * as path from 'node:path';
import * as os from 'node:os';
import mkdirp from 'mkdirp';

export async function getDotConfigDir() {
	const dotConfigDir = path.join(os.homedir(), '.config');
	await mkdirp(dotConfigDir);
	return dotConfigDir;
}
