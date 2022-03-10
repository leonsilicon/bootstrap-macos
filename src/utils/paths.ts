import * as path from 'node:path';
import onetime from 'onetime';
import { join } from 'desm';

export const getRootPath = onetime(() => join(import.meta.url, '../..'));
export const getGeneratedPath = onetime(() =>
	path.join(getRootPath(), './generated')
);