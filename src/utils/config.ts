import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';

export async function getDotConfigFolderPath() {
	const dotConfigFolderPath = path.join(os.homedir(), '.config');
	await fs.promises.mkdir(dotConfigFolderPath, {
		recursive: true,
	});
	return dotConfigFolderPath;
}
