import { createBootstrapper } from '~/utils/bootstrapper.js';

export const discordBootstrapper = createBootstrapper({
	name: 'Discord',
	todo: true,
	bootstrap() {
		// todo: install some custom discord plugins?
	},
});

export default discordBootstrapper;
