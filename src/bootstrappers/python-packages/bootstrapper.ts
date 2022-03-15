import pythonBootstrapper from '~/bootstrappers/python/bootstrapper.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { pipInstall } from '~/utils/python.js';

export const pythonPackagesBootstrapper = createBootstrapper({
	name: 'Python packages',
	async bootstrap(context) {
		await pythonBootstrapper.bootstrap(context);

		await pipInstall(context, 'tensorflow');
		await pipInstall(context, 'pandas');
		await pipInstall(context, 'numpy');
		await pipInstall(context, 'scipy');
		await pipInstall(context, 'matplotlib');
		await pipInstall(context, 'pytest');
	},
});

export default pythonPackagesBootstrapper;
