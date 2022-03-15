import * as path from 'node:path';
import * as os from 'node:os';
import onetime from 'onetime';
import { join } from 'desm';

export const getRootDir = onetime(() => join(import.meta.url, '../..'));
export const getGeneratedDir = onetime(() =>
	path.join(getRootDir(), './generated')
);
export const getCodeDir = onetime(() => path.join(os.homedir(), 'code'));
export const getDownloadsDir = onetime(() =>
	path.join(os.homedir(), 'Downloads')
);
