import { createBootstrapper } from '~/utils/bootstrapper.js';

export const zshBootstrapper = createBootstrapper({
	name: 'zsh',
	bootstrap() {
		// set up oh-my-zsh and some zsh aliases and zsh autocomplete
	},
});

export default zshBootstrapper;
