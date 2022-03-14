import { pipxBootstrapper } from '~/bootstrappers/python/pipx/bootstrapper.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { runCommand } from '~/utils/command.js';

export const hatchBootstrapper = createBootstrapper({
	name: 'Hatch',
	link: 'https://github.com/ofek/hatch',
	async bootstrap(context) {
		await pipxBootstrapper.bootstrap(context);
		await runCommand(context, {
			link: 'https://ofek.dev/hatch/latest/install/#pipx',
			description: 'Installing hatch via pipx',
			command: 'pipx install --pip-args "--upgrade --pre" hatch',
		});
	},
});
