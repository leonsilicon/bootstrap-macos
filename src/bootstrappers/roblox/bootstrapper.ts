import { createBootstrapper } from '~/utils/bootstrapper.js';
import { downloadGitHubLatestRelease } from '~/utils/github.js';
import { sendMessage } from '~/utils/message.js';
import { pnpmInstall } from '~/utils/pnpm.js';

export const robloxBootstrapper = createBootstrapper({
	name: 'Roblox',
	todo: true,
	async bootstrap(context) {
		await sendMessage(context, {
			message: 'Installing Roblox TS, a TypeScript-to-Luau Compiler for Roblox',
			link: 'https://roblox-ts.com',
		});
		await pnpmInstall(context, 'roblox-ts');

		const _rojoZipPath = await downloadGitHubLatestRelease(context, {
			repository: 'rojo-rbx/rojo',
			findAssetName: (name) => name.includes('macos'),
			fileName: 'rojo.zip',
		});

		// Fix unidentified developer issues
	},
});

export default robloxBootstrapper;
