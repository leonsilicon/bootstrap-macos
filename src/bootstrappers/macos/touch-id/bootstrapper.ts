import { createBootstrapper } from '~/utils/bootstrapper.js';

export const touchIdBootstrapper = createBootstrapper({
	name: 'Touch ID',
	needsManualIntervention: true,
	todo: true,
	bootstrap() {
		// todo
	},
});

export default touchIdBootstrapper;
