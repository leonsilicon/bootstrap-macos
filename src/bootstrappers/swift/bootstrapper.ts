import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';
import { runCommand } from '~/utils/command.js';
import { sendMessage } from '~/utils/message.js';
import { pressToContinue } from '~/utils/prompt.js';
import { addToZshrc } from '~/utils/zsh.js';

export const swiftBootstrapper = createBootstrapper({
	name: 'Swift',
	async bootstrap(context) {
		await sendMessage(context, 'Mint is a swift package management tool.');
		await brewInstall(context, 'mint');

		await pressToContinue(
			context,
			"when you've finished following the instructions at https://stackoverflow.com/questions/61501298/xcrun-error-unable-to-find-utility-xctest-not-a-developer-tool-or-in-path"
		);

		await runCommand(context, {
			command: 'mint install apple/swift-format@swift-5.5-branch',
		});

		await addToZshrc(context, {
			content: `export PATH="$PATH/Users/leonzalion/.mint/bin`,
		});

		// TODO: install apple-swift-format vscode extension
	},
});

export default swiftBootstrapper;
