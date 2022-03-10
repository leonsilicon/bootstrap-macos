import appExists from 'app-exists';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';

export const alacrittyBootstrapper = createBootstrapper({
	async skip() {
		return appExists('Alacritty');
	},
	async bootstrap() {
		await brewInstall('alacritty', { cask: true });
	},
});
