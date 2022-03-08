import open from 'open';
import { brewInstall } from '~/utils/brew.js';

export async function installPython() {
	brewInstall('pyenv')
	await open('https://github.com/pyenv/pyenv#basic-github-checkout');
}
