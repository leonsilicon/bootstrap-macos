import { createBootstrapper } from '~/utils/bootstrapper.js';

export const timeMachineBootstrapper = createBootstrapper({
	name: 'Time Machine',
	todo: true,
	needsManualIntervention: true,
	bootstrap() {
		// todo
	},
});

export default timeMachineBootstrapper;
