import { createBootstrapper } from '~/utils/bootstrapper.js';

export const alfredBootstrapper = createBootstrapper({
	name: 'Alfred',
	todo: true,
	bootstrap() {
		// todo: maybe install some alfred plugins?
	},
});

export default alfredBootstrapper;
