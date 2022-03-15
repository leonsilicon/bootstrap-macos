import { got } from 'got';
import type { BootstrapperContext } from '~/types/context.js';
import { downloadFromUrl } from '~/utils/download.js';
import { getRepositoryIdentifier } from '~/utils/git.js';

// https://gist.github.com/steinwaywhw/a4cd19cda655b8249d908261a62687f8
type DownloadGitHubLatestReleaseProps = {
	repository: string;
	fileName: string;
};
export async function downloadGitHubLatestRelease(
	context: BootstrapperContext,
	{ repository, fileName }: DownloadGitHubLatestReleaseProps
) {
	const repositoryIdentifier = getRepositoryIdentifier(repository);
	const response = await got(
		`https://api.github.com/repos/${repositoryIdentifier}/releases/latest`
	);
	const repoInfo = JSON.parse(response.body) as {
		assets: Array<{ browser_download_url: string }>;
	};
	const downloadUrl = repoInfo.assets[0]?.browser_download_url;
	if (downloadUrl === undefined) {
		throw new Error('Download URL not found.');
	}

	const filePath = await downloadFromUrl(context, {
		fileName,
		url: downloadUrl,
	});

	return filePath;
}
