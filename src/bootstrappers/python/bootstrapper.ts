import pyenvBootstrapper from '~/bootstrappers/pyenv/bootstrapper.js';
import pythonPackagesBootstrapper from '~/bootstrappers/python-packages/bootstrapper.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { commandExists, runCommand } from '~/utils/command.js';

export const pythonBootstrapper = createBootstrapper<{ version: string }>({
	name: 'Python',
	async skip(context) {
		return commandExists(context, 'python');
	},
	async bootstrap(context, args) {
		await pyenvBootstrapper.bootstrap(context);

		// If a specific version isn't specified, install the latest
		if (args?.version === undefined) {
			const { stdout: latestPython } = await runCommand(context, {
				command: 'pyenv install --list | grep -v - | grep -v b | tail -1',
				shell: true,
			});

			await runCommand(context, {
				description: 'Installing the latest version of Python using pyenv',
				link: 'https://stackoverflow.com/a/33423958',
				command: ['pyenv', 'install', latestPython],
			});

			await runCommand(context, {
				command: ['pyenv', 'global', latestPython],
			});
		}
		// Install a specific version of Python
		else {
			await runCommand(context, {
				description: `Installing Python ${args.version} using pyenv`,
				command: `pyenv install -v ${args.version}`,
			});
		}

		// TODO: https://stackoverflow.com/a/60469203
		await pythonPackagesBootstrapper.bootstrap(context);
	},
});

export default pythonBootstrapper;
