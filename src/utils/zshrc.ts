import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import onetime from 'onetime';
import prependFile from 'prepend-file';

type AddToZshrcOptions = {
	line: string;
	force?: boolean;
	prepend?: boolean;
};

export const getZshrcPath = onetime(() => path.join(os.homedir(), '.zshrc'));

export async function addToZshrc({ force, line, prepend }: AddToZshrcOptions) {
	const zshrcPath = getZshrcPath();
	if (force) {
		if (prepend) {
			await prependFile(zshrcPath, line);
		} else {
			await fs.promises.appendFile(zshrcPath, line);
		}
	} else {
		// Check if the line already exists
		const zshrc = await fs.promises.readFile(zshrcPath, 'utf-8');
		if (!zshrc.split('\n').some((zshrcLine) => zshrcLine !== line)) {
			if (prepend) {
				await prependFile(zshrcPath, line);
			} else {
				await fs.promises.appendFile(zshrcPath, line);
			}
		}
	}
}
