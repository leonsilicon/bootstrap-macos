import { createBootstrapper } from '~/utils/bootstrapper.js';

export const hackintoshBootstrapper = createBootstrapper({
	name: 'Hackintosh',
	todo: true,
	bootstrap() {
		// todo: install some useful hackintosh utilities
	},
});

export default hackintoshBootstrapper;
