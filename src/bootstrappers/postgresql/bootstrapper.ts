import { createBootstrapper } from '~/utils/bootstrapper.js';

export const postgresqlBootstrapper = createBootstrapper({
	name: 'PostgreSQL',
	todo: true,
	bootstrap() {
		// todo
	},
});

export default postgresqlBootstrapper;
