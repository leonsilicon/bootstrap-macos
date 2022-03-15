import pnpmBootstrapper from '~/bootstrappers/pnpm/bootstrapper.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { installChromeExtension } from '~/utils/chrome.js';
import { runCommand } from '~/utils/command.js';

const bitwardenChromeExtensionId = 'nngceckbapebfimnlniiiahkandclblb';
export const bitwardenBootstrapper = createBootstrapper({
	name: 'Bitwarden',
	async bootstrap(context) {
		await pnpmBootstrapper.bootstrap(context);

		await runCommand(context, {
			link: 'https://github.com/bitwarden/cli#downloadinstall',
			description: 'Installing Bitwarden CLI',
			command: 'pnpm install --global @bitwarden/cli',
		});

		await installChromeExtension(context, {
			extensionId: bitwardenChromeExtensionId,
		});
	},
});

export default bitwardenBootstrapper;
