import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';

export const chromeBootstrapper = createBootstrapper({
	name: 'Chrome',
	async bootstrap(context) {
		await brewInstall(context, 'google-chrome', { cask: true });
	},
});

export default chromeBootstrapper;
