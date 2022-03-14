import { createBootstrapper } from '~/utils/bootstrapper.js';

export const ankiBootstrapper = createBootstrapper({
	name: 'Anki',
	todo: true,
	bootstrap() {
		// todo: install ankiweb plugin
	},
});

export default ankiBootstrapper;
