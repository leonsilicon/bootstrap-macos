import { createBootstrapper } from '~/utils/bootstrapper.js';

export const batteryBootstrapper = createBootstrapper({
	name: 'Battery',
	todo: true,
	bootstrap() {
		// todo: set the display settings in battery to a preconfigured amount
	},
});

export default batteryBootstrapper;
