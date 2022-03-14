import { createBootstrapper } from '~/utils/bootstrapper.js';
import { runCommand } from '~/utils/command.js';
import { sendMessage } from '~/utils/message.js';
import { addToZshrc } from '~/utils/zsh.js';

export const zshBootstrapper = createBootstrapper({
	name: 'zsh',
	async bootstrap(context) {
		await runCommand(context, {
			description: 'Installing oh-my-zsh',
			link: 'https://ohmyz.sh',
			command:
				'sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" --keep-zshrc',
		});

		await addToZshrc(context, {
			prepend: true,
			content: 'export ZSH="$HOME/.oh-my-zsh"',
		});

		await addToZshrc(context, {
			content: 'source $ZSH/oh-my-zsh.sh',
		});

		await sendMessage(context, 'Setting up zsh-autocomplete');
	},
});

export default zshBootstrapper;
