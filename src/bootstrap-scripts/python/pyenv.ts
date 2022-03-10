import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';
import { commandExists } from '~/utils/command.js';
import { addToZprofile, addToZshrc } from '~/utils/zsh.js';

export const pyenvBootstrapper = createBootstrapper({
	async skip() {
		return commandExists('pyenv');
	},
	async bootstrap() {
		await brewInstall('pyenv');
		await addToZshrc({
			content: 'eval "$(pyenv init -)"',
		});
		await addToZprofile({
			content: 'eval "$(pyenv init --path)"',
		});
	},
});
