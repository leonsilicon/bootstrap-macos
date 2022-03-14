import { createBootstrapper } from '~/utils/bootstrapper.js';

export const firefoxBootstrapper = createBootstrapper({
	name: 'Firefox',
	todo: true,
	bootstrap() {
		// todo: install useful firefox extensions
	},
});

export default firefoxBootstrapper;
