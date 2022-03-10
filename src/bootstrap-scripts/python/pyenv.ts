import { brewInstall } from '~/utils/brew.js';
import { addToZprofile, addToZshrc } from '~/utils/zsh.js';

export async function installPyenv() {
	await brewInstall('pyenv');
	await addToZshrc({
		content: 'eval "$(pyenv init -)"',
	});
	await addToZprofile({
		content: 'eval "$(pyenv init --path)"',
	});
}
