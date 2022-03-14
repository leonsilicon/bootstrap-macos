import { createBootstrapper } from '~/utils/bootstrapper.js';

export const gccBootstrapper = createBootstrapper({
	name: 'gcc',
	bootstrap() {
		// todo: set g++ alias and make sure bits/stdc++ works
	},
});

export default gccBootstrapper;
