import { brewInstall } from '~/utils/brew.js';

export async function installLatex() {
	brewInstall('mactex', { cask: true });
}
