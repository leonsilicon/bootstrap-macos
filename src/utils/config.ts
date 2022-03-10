import * as path from 'node:path';
import * as os from 'node:os';
import mkdirp from 'mkdirp';

export async function getDotConfigFolderPath() {
	const dotConfigFolderPath = path.join(os.homedir(), '.config');
	await mkdirp(dotConfigFolderPath);
	return dotConfigFolderPath;
}
