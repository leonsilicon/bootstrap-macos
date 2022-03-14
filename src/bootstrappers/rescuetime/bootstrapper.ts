import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';
import { installChromeExtension } from '~/utils/chrome.js';

// https://chrome.google.com/webstore/detail/rescuetime-for-chrome-and/bdakmnplckeopfghnlpocafcepegjeap
const rescuetimeChromeExtensionId = 'bdakmnplckeopfghnlpocafcepegjeap';

export const rescuetimeBootstrapper = createBootstrapper({
	name: 'RescueTime',
	async bootstrap(context) {
		await brewInstall(context, 'rescuetime', { cask: true });
		await installChromeExtension(context, {
			extensionId: rescuetimeChromeExtensionId,
		});
	},
});

export default rescuetimeBootstrapper;
