import { pyenvBootstrapper } from '~/bootstrap-scripts/python/pyenv.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';

type BootstrapProps = {
	version: string;
};
export const pythonBootstrapper = createBootstrapper({
	async bootstrap(_props?: BootstrapProps) {
		await pyenvBootstrapper.bootstrap();
	},
});
