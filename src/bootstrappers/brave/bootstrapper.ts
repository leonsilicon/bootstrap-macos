import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';

export const braveBootstrapper = createBootstrapper({
	name: 'Brave',
	async bootstrap(context) {
		await brewInstall(context, 'brave-browser', { cask: true });
	},
});

export default braveBootstrapper;
