import { outdent } from 'outdent';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { addToFile } from '~/utils/file.js';
import { sendMessage } from '~/utils/message.js';
import { addToZshrc } from '~/utils/zsh.js';

export const zshBootstrapper = createBootstrapper({
	name: 'zsh',
	async bootstrap(context) {
		await sendMessage(context, 'Setting up oh-my-zsh');

		await addToZshrc(context, {
			prepend: true,
			content: outdent`
				export ZSH="$HOME/.oh-my-zsh"
			`,
		});

		await addToZshrc(context, {
			content: outdent`
				source $ZSH/oh-my-zsh.sh
			`,
		});

		await sendMessage(context, 'Setting up zsh-autocomplete');
	},
});

export default zshBootstrapper;
