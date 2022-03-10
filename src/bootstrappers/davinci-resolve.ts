import open from 'open';
import { createBootstrapper } from '~/utils/bootstrapper.js';

export const davinciResolveBootstrapper = createBootstrapper({
	manualInterventionNeeded: true,
	async bootstrap() {
		await open('https://www.blackmagicdesign.com/ca/products/davinciresolve/');
		// TODO: Install Python 3.6 for DaVinci Scripting
	},
});
