import * as path from 'node:path';
import type { BootstrapperContext } from '~/types/context.js';
import { runCommand } from '~/utils/command.js';
import { getDownloadsDir } from '~/utils/paths.js';

type DownloadFromUrlProps = {
	url: string;
	fileName: string;
	downloadsDir?: string;
};
export async function downloadFromUrl(
	context: BootstrapperContext,
	{ url, fileName, downloadsDir = getDownloadsDir() }: DownloadFromUrlProps
) {
	const filePath = path.join(downloadsDir, fileName);
	await runCommand(context, {
		description: `Downloading ${url}...`,
		command: ['curl', url, filePath],
	});
	return filePath;
}
