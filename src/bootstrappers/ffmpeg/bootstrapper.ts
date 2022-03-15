import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';

export const ffmpegBootstrapper = createBootstrapper({
	name: 'ffmpeg',
	async bootstrap(context) {
		await brewInstall(context, 'ffmpeg');
	},
});

export default ffmpegBootstrapper;
