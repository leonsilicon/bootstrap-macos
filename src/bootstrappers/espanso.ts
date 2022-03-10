import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';
import { runCommand } from '~/utils/command.js';
import { sendMessage } from '~/utils/message.js';

export const espansoBootstrapper = createBootstrapper({
	name: 'espanso',
	async bootstrap(context) {
		await runCommand(context, {
			link: 'https://espanso.org/docs/next/install/mac/#install-using-homebrew',
			description: 'Add espanso tap',
			command: 'brew tap espanso/espanso',
		});

		await brewInstall(context, 'espanso');

		const { stdout: espansoConfigPath } = await runCommand(context, {
			description: "Get espanso's configuration path",
			command: 'espanso path',
		});

		await sendMessage(
			context,
			`Configure espanso by adding files to ${espansoConfigPath}!`
		);
	},
});

export default espansoBootstrapper;
