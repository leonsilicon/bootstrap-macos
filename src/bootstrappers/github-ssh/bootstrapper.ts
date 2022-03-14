import * as path from 'node:path';
import * as os from 'node:os';
import * as fs from 'node:fs';
import { outdent } from 'outdent';
import open from 'open';
import { pressToContinue, promptInput } from '~/utils/prompt.js';
import { runCommand } from '~/utils/command.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { sendMessage } from '~/utils/message.js';

export const githubBootstrapper = createBootstrapper({
	name: 'GitHub SSH',
	needsManualIntervention: true,
	async bootstrap(context) {
		// https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

		const emailAddress = context.dryRun
			? 'email@example.com'
			: await promptInput(context, {
					message: 'Please enter your GitHub email address',
			  });

		const passphrase = await promptInput(context, {
			message: 'Please enter an SSH passphrase',
			password: true,
		});

		const confirmPassphrase = await promptInput(context, {
			message: 'Enter same passphrase again',
			password: true,
		});

		if (passphrase !== confirmPassphrase) {
			throw new Error('Passphrase was not equal to confirm passphrase.');
		}

		const sshKeygenProcess = runCommand(context, {
			description: `Generating a new SSH Key for email ${emailAddress}`,
			link: 'https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key',
			command: ['ssh-keygen', '-t', 'ed25519', '-C', emailAddress],
		});

		sshKeygenProcess.send('\n'); // Saves the key in the default place
		sshKeygenProcess.send(`\n${passphrase}`); // SSH "Enter passphrase" prompt
		sshKeygenProcess.send(`\n${confirmPassphrase}`); // SSH "Enter same passphrase again" prompt

		await sshKeygenProcess;

		await sendMessage(context, {
			message: 'Adding SSH key to the ssh-agent',
			link: 'https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent',
		});

		await runCommand(context, {
			description: 'Starting the ssh-agent in the background.',
			command: 'eval "$(ssh-agent -s)"',
			shell: true,
		});

		if (!context.dryRun) {
			const sshConfigPath = path.join(os.homedir(), '.ssh', 'config');
			await fs.promises.writeFile(
				sshConfigPath,
				outdent`
					Host *
					AddKeysToAgent yes
					UseKeychain yes
					IdentityFile ~/.ssh/id_ed25519
				`
			);
		}

		await runCommand(context, {
			description: 'Add SSH private key to ssh-agent',
			command: 'ssh-add -K ~/.ssh/id_ed25519',
		});

		await open('https://github.com/settings/ssh/new');

		await pressToContinue(
			context,
			"when you've added to SSH key to your GitHub account"
		);
	},
});

export default githubBootstrapper;
