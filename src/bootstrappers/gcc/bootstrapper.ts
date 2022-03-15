import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';
import { addZshAlias } from '~/utils/zsh.js';

export const gccBootstrapper = createBootstrapper({
	name: 'gcc',
	async bootstrap(context) {
		await brewInstall(context, 'gcc');
		await addZshAlias(context, { name: 'g', value: 'g++ -std=c++17' });
	},
});

export default gccBootstrapper;
