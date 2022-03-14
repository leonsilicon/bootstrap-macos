import pyenvBootstrapper from '~/bootstrappers/pyenv/bootstrapper.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { runCommand } from '~/utils/command.js';

export const pythonBootstrapper = createBootstrapper<{ version: string }>({
	name: 'Python',
	async bootstrap(context, args) {
		await pyenvBootstrapper.bootstrap(context);

		// If a specific version isn't specified, install the latest
		if (args?.version === undefined) {
			await runCommand(context, {
				description: 'Installing the latest version of Python using pyenv',
				link: 'https://stackoverflow.com/a/33423958',
				command:
					'pyenv install $(pyenv install --list | grep -v - | grep -v b | tail -1)',
				shell: true,
			});
		}
		// Install a specific version of Python
		else {
			await runCommand(context, {
				description: `Installing Python ${args.version} using pyenv`,
				command: `pyenv install -v ${args.version}`,
			});
		}

		// todo: install python-tk?
	},
});

export default pythonBootstrapper;
