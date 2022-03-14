import { createBootstrapper } from '~/utils/bootstrapper.js';

export const hashedOutBootstrapper = createBootstrapper({
	name: 'Hashed Out',
	todo: true,
	bootstrap() {
		// todo: includes creating the admin accounts and setting up sudo privileges and stuff
	},
});

export default hashedOutBootstrapper;
