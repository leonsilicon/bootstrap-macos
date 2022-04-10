import { createBootstrapper } from '~/utils/bootstrapper.js';

export const swiftBootstrapper = createBootstrapper({
	name: 'Heroku',
	todo: true,
	bootstrap() {
		// Mint is a swift formatter
		await brewInstall('mint');
	},
});

export default swiftBootstrapper;
