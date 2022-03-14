import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';

export const redisBootstrapper = createBootstrapper({
	name: 'Redis',
	async bootstrap(context) {
		await brewInstall(context, 'redis');
	},
});

export default redisBootstrapper;
