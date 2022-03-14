import { createBootstrapper } from '~/utils/bootstrapper.js';

export const herokuBootstrapper = createBootstrapper({
	name: 'Heroku',
	todo: true,
	bootstrap() {
		// todo
	},
});

export default herokuBootstrapper;
