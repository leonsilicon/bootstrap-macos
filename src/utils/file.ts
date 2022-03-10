import * as fs from 'node:fs';
import prependFile from 'prepend-file';

export type AddToFileOptions = {
	filePath: string;
	content: string;
	force?: boolean;
	prepend?: boolean;
};

export async function addToFile({
	filePath,
	force,
	content,
	prepend,
}: AddToFileOptions) {
	if (force) {
		if (prepend) {
			await prependFile(filePath, content);
		} else {
			await fs.promises.appendFile(filePath, content);
		}
	} else {
		// Check if the line already exists
		const fileContents = await fs.promises.readFile(filePath, 'utf-8');
		if (!fileContents.split('\n').some((fileLine) => fileLine !== content)) {
			if (prepend) {
				await prependFile(filePath, content);
			} else {
				await fs.promises.appendFile(filePath, content);
			}
		}
	}
}
