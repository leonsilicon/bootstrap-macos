import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';

export const youtubedlBootstrapper = createBootstrapper({
	name: 'youtube-dl',
	async bootstrap(context) {
		await brewInstall(context, 'yt-dlp/taps/yt-dlp');
	},
});

export default youtubedlBootstrapper;
