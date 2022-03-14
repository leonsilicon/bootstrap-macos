import appExists from 'app-exists';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';

export const alacrittyBootstrapper = createBootstrapper({
	name: 'Alacritty',
	description: 'A cross-platform, OpenGL terminal emulator.',
	async skip() {
		return appExists('Alacritty');
	},
	async bootstrap(context) {
		await brewInstall(context, 'alacritty', { cask: true });
	},
});

export default alacrittyBootstrapper;
