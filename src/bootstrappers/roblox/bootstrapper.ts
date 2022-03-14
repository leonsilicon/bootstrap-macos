import { createBootstrapper } from '~/utils/bootstrapper.js';

export const robloxBootstrapper = createBootstrapper({
	name: 'Roblox',
	todo: true,
	bootstrap() {
		// todo: install useful Roblox development tools, rojo, roblox-ts, etc.
	},
});

export default robloxBootstrapper;
