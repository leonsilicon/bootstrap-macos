import { createBootstrapper } from '~/utils/bootstrapper.js';

export const figmaBootstrapper = createBootstrapper({
	name: 'Figma',
	todo: true,
	bootstrap() {
		// todo: install desktop app
	},
});

export default figmaBootstrapper;
