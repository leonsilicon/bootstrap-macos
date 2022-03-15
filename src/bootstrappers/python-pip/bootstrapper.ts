import pythonBootstrapper from '~/bootstrappers/python/bootstrapper.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { runCommand } from '~/utils/command.js';

export const pythonPipBootstrapper = createBootstrapper<{ python2: boolean }>({
	name: 'Python pip',
	async bootstrap(context, args) {
		await pythonBootstrapper.bootstrap(context);

		if (args.python2) {
			await runCommand(context, {
				command: 'python2.7 -m ensurepip --default-pip --user',
			});
		}
	},
});

export default pythonPipBootstrapper;