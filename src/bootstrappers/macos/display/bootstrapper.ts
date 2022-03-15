import { createBootstrapper } from '~/utils/bootstrapper.js';

export const displayBootstrapper = createBootstrapper({
	name: 'macOS Display Settings',
	needsManualIntervention: true,
	todo: true,
	async bootstrap() {
		// todo
	},
});

export default displayBootstrapper;
