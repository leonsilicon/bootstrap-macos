import { createBootstrapper } from '~/utils/bootstrapper.js';
import { runCommand } from '~/utils/command.js';
import { promptInput } from '~/utils/prompt.js';

export const githubBootstrapper = createBootstrapper({
	name: 'GitHub SSH',
	async bootstrap(context) {
		// https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

		const emailAddress = context.dryRun
			? 'email@example.com'
			: await promptInput(context, {
					message: 'Please enter your GitHub email address',
			  });

		await runCommand(context, {
			description: `Generating a new SSH Key for email ${emailAddress}`,
			link: 'https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key',
			command: ['ssh-keygen', '-t', 'ed25519', '-C', emailAddress],
			// Saves the key in the default place
			input: '\n',
		});

		// TODO: set up github SSH
	},
});

export default githubBootstrapper;
