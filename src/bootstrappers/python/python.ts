import { pyenvBootstrapper } from '~/bootstrappers/python/pyenv.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { runCommand } from '~/utils/command.js';

export const pythonBootstrapper = createBootstrapper<{ version: string }>({
	async bootstrap(props) {
		await pyenvBootstrapper.bootstrap();

		// If a specific version isn't specified, install the latest
		if (props?.version === undefined) {
			await runCommand({
				description: 'Installing the latest version of Python using pyenv',
				link: 'https://stackoverflow.com/a/33423958',
				command:
					'pyenv install $(pyenv install --list | grep -v - | grep -v b | tail -1)',
				shell: true,
			});
		}
		// Install a specific version of Python
		else {
			await runCommand({
				description: `Installing Python ${props.version} using pyenv`,
				command: `pyenv install -v ${props.version}`,
			});
		}
	},
});
