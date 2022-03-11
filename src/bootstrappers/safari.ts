import { createBootstrapper } from '~/utils/bootstrapper.js';

export const safariBootstrapper = createBootstrapper({
	name: 'Safari',
	bootstrap() {
		// todo: install useful safari extensions
	},
});

export default safariBootstrapper;
