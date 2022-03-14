import { createBootstrapper } from '~/utils/bootstrapper.js';

export const vimBootstrapper = createBootstrapper({
	name: 'Vim',
	todo: true,
	bootstrap() {
		// todo: initialize sane vim configs and maybe install neovim
	},
});

export default vimBootstrapper;
