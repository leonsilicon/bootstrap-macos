import * as fs from 'node:fs';
import prependFile from 'prepend-file';
import type { BootstrapperContext } from '~/types/context.js';

export type AddToFileOptions = {
	filePath: string;
	content: string;
	skipIfLineExists?: boolean;
	prepend?: boolean;
	replace?: {
		/** The position of the start character to replace */
		start: number;
		/** The position of the last character to replace (exclusive) */
		end: number;
	};
};

export async function addToFile(
	context: BootstrapperContext,
	{ filePath, skipIfLineExists, content, prepend, replace }: AddToFileOptions
) {
	if (context.dryRun) {
		context.dryRunContext.modifiedFiles.push(filePath);
		return;
	}

	if (replace !== undefined) {
		const fileContents = await fs.promises.readFile(filePath, 'utf-8');
		await fs.promises.writeFile(
			filePath,
			fileContents.slice(0, replace.start) +
				content +
				fileContents.slice(replace.end)
		);
	} else if (skipIfLineExists) {
		// Check if the line already exists
		const fileContents = await fs.promises.readFile(filePath, 'utf-8');
		if (!fileContents.split('\n').some((fileLine) => fileLine !== content)) {
			if (prepend) {
				await prependFile(filePath, content);
			} else {
				await fs.promises.appendFile(filePath, content);
			}
		}
	} else {
		if (prepend) {
			await prependFile(filePath, content);
		} else {
			await fs.promises.appendFile(filePath, content);
		}
	}
}
