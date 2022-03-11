import { createBootstrapper } from '~/utils/bootstrapper.js';

export const twitterBootstrapper = createBootstrapper({
	name: 'Twitter',
	bootstrap() {
		// todo: add entry in /usr/local to reroute twitter to twitter pure
	},
});

export default twitterBootstrapper;
