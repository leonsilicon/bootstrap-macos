import { createBootstrapper } from '~/utils/bootstrapper.js';

export const twitterPureBootstrapper = createBootstrapper({
	name: 'Twitter',
	todo: true,
	bootstrap() {
		// todo: add entry in /usr/local to reroute twitter to twitter pure
	},
});

export default twitterPureBootstrapper;
