import * as path from 'node:path';
import * as fs from 'node:fs';
import * as os from 'node:os';
import onetime from 'onetime';
import mkdirp from 'mkdirp';
import type { BootstrapperContext } from '~/types/context.js';

export const getChromeExtensionsFolderPath = onetime(() =>
	path.join(
		os.homedir(),
		'Library/Application Support/Google/Chrome/External Extensions'
	)
);

export async function createChromeExtensionsFolder(
	context: BootstrapperContext
) {
	const chromeExtensionsFolderPath = getChromeExtensionsFolderPath();
	if (context.dryRun) {
		return chromeExtensionsFolderPath;
	}

	await mkdirp(chromeExtensionsFolderPath);
	return chromeExtensionsFolderPath;
}

type InstallChromeExtensionProps = {
	extensionId: string;
};
// https://developer.chrome.com/docs/extensions/mv3/external_extensions/
export async function installChromeExtension(
	context: BootstrapperContext,
	{ extensionId }: InstallChromeExtensionProps
) {
	if (context.dryRun) return;

	const chromeExtensionsFolderPath = await createChromeExtensionsFolder(
		context
	);
	const extensionJsonPath = path.join(
		chromeExtensionsFolderPath,
		`${extensionId}.json`
	);

	const extensionJson = {
		external_update_url: 'https://clients2.google.com/service/update2/crx',
	};

	await fs.promises.writeFile(extensionJsonPath, JSON.stringify(extensionJson));
}
