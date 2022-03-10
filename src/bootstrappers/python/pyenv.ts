import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';
import { commandExists } from '~/utils/command.js';
import { addToZprofile, addToZshrc } from '~/utils/zsh.js';

export const pyenvBootstrapper = createBootstrapper({
	name: 'pyenv',
	description: 'Python Version Manager',
	async skip(context) {
		return commandExists(context, 'pyenv');
	},
	async bootstrap(context) {
		await brewInstall(context, 'pyenv');
		await addToZshrc(context, {
			content: 'eval "$(pyenv init -)"',
		});
		await addToZprofile(context, {
			content: 'eval "$(pyenv init --path)"',
		});
	},
});

export default pyenvBootstrapper;
