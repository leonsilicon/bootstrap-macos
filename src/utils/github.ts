import { got } from 'got';
import type { BootstrapperContext } from '~/types/context.js';
import { downloadFromUrl } from '~/utils/download.js';
import { getRepositoryIdentifier } from '~/utils/git.js';

// https://gist.github.com/steinwaywhw/a4cd19cda655b8249d908261a62687f8
type DownloadGitHubLatestReleaseProps = {
	repository: string;
	findAssetName?: (artifactName: string) => boolean;
	fileName: string;
};
export async function downloadGitHubLatestRelease(
	context: BootstrapperContext,
	{ repository, fileName, findAssetName }: DownloadGitHubLatestReleaseProps
): Promise<string> {
	if (context.dryRun) {
		return '/tmp/non_existent_file';
	}

	const repositoryIdentifier = getRepositoryIdentifier(repository);
	const response = await got(
		`https://api.github.com/repos/${repositoryIdentifier}/releases/latest`
	);
	const repoInfo = JSON.parse(response.body) as {
		assets: Array<{ browser_download_url: string; name: string }>;
	};

	const asset =
		findAssetName === undefined
			? repoInfo.assets[0]
			: repoInfo.assets.find(({ name }) => findAssetName(name));

	if (asset === undefined) {
		throw new Error('Asset not found.');
	}

	const filePath = await downloadFromUrl(context, {
		fileName,
		url: asset.browser_download_url,
	});

	return filePath;
}
