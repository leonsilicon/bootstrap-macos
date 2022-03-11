import { createBootstrapper } from '~/utils/bootstrapper.js';

export const bitwardenBootstrapper = createBootstrapper({
	name: 'Bitwarden',
	bootstrap() {
		// todo: install cli and browser extension
	},
});

export default bitwardenBootstrapper;
