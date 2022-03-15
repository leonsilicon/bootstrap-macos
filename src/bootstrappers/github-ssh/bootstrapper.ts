import * as path from 'node:path';
import * as os from 'node:os';
import * as fs from 'node:fs';
import { outdent } from 'outdent';
import open from 'open';
import { pressToContinue, promptInput, promptYesNo } from '~/utils/prompt.js';
import { runCommand } from '~/utils/command.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { sendMessage } from '~/utils/message.js';
import { copyToClipboard } from '~/utils/clipboard.js';

export const githubBootstrapper = createBootstrapper({
	name: 'GitHub SSH',
	needsManualIntervention: true,
	async bootstrap(context) {
		// https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

		const sshKeyExists = fs.existsSync(
			path.join(os.homedir(), '.ssh/id_ed25519')
		);
		let overwriteSshKey = false;
		if (sshKeyExists) {
			const response = await promptYesNo(context, {
				message: 'The SSH key already exists. Would you like to overwrite it?',
			});
			overwriteSshKey = response;
		}

		if (!sshKeyExists || overwriteSshKey) {
			const emailAddress = context.dryRun
				? 'email@example.com'
				: await promptInput(context, {
						message: 'Please enter your public GitHub email address',
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
				command: [
					'ssh-keygen',
					'-t',
					'ed25519',
					'-C',
					emailAddress,
					'-N',
					passphrase === '' ? '""' : passphrase,
				],
				stdout: 'inherit',
				stdin: 'pipe',
			});

			if (overwriteSshKey) {
				sshKeygenProcess.stdin?.write('y\n');
			}

			await sshKeygenProcess;
		}

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
			command: ['ssh-add', '-K', path.join(os.homedir(), '.ssh/id_ed25519')],
		});

		if (!context.dryRun) {
			const sshKey = await fs.promises.readFile(
				path.join(os.homedir(), '.ssh/id_ed25519'),
				'utf8'
			);
			await copyToClipboard(context, sshKey);
		}

		await open('https://github.com/settings/ssh/new');

		await pressToContinue(
			context,
			"when you've added to SSH key to your GitHub account"
		);
	},
});

export default githubBootstrapper;
