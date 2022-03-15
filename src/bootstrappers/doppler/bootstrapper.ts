import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';
import { runCommand } from '~/utils/command.js';

export const dopplerBootstrapper = createBootstrapper({
	name: 'Doppler',
	needsManualIntervention: true,
	todo: true,
	async bootstrap(context) {
		// Prerequisite. gnupg is required for binary signature verification
		await brewInstall(context, 'gnupu');

		const { stdout } = runCommand(context, {
			link: 'https://docs.doppler.com/docs/install-cli#installation',
			command:
				'curl -Ls --tlsv1.2 --proto "=https" --retry 3 https://cli.doppler.com/install.sh',
		});

		await runCommand(context, {
			command: 'sh',
			stdin: stdout!,
			sudo: true,
		});

		const _dopplerLogin = runCommand(context, {
			command: 'doppler login',
		});

		// TODO: copy auth code
	},
});

export default dopplerBootstrapper;
