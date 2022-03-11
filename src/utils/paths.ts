import * as path from 'node:path';
import * as os from 'node:os';
import onetime from 'onetime';
import { join } from 'desm';

export const getRootPath = onetime(() => join(import.meta.url, '../..'));
export const getGeneratedPath = onetime(() =>
	path.join(getRootPath(), './generated')
);
export const getCodeFolderPath = onetime(() => path.join(os.homedir(), 'code'));
