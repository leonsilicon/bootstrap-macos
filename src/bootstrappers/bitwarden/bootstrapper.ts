import { createBootstrapper } from '~/utils/bootstrapper.js';
import { installChromeExtension } from '~/utils/chrome.js';
import { sendMessage } from '~/utils/message.js';
import { pnpmInstall } from '~/utils/pnpm.js';

const bitwardenChromeExtensionId = 'nngceckbapebfimnlniiiahkandclblb';
export const bitwardenBootstrapper = createBootstrapper({
	name: 'Bitwarden',
	async bootstrap(context) {
		await sendMessage(context, {
			message: 'Installing Bitwarden CLI',
			link: 'https://github.com/bitwarden/cli#downloadinstall',
		});
		await pnpmInstall(context, '@bitwarden/cli');

		await installChromeExtension(context, {
			extensionId: bitwardenChromeExtensionId,
		});
	},
});

export default bitwardenBootstrapper;
