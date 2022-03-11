import { createBootstrapper } from '~/utils/bootstrapper.js';

const awsBootstrapper = createBootstrapper({
	name: 'AWS',
	async bootstrap() {
		// todo: set up AWS cli and credentials and stuff
	},
});

export default awsBootstrapper;
