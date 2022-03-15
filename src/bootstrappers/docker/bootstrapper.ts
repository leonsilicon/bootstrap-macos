import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';

export const dockerBootstrapper = createBootstrapper({
	name: 'Docker',
	async bootstrap(context) {
		await brewInstall(context, 'docker', { cask: true });
	},
});

export default dockerBootstrapper;
