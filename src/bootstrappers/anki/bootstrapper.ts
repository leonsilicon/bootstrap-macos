import open from 'open';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';
import { pressToContinue } from '~/utils/prompt.js';

export const ankiBootstrapper = createBootstrapper({
	name: 'Anki',
	needsManualIntervention: true,
	async bootstrap(context) {
		await brewInstall(context, 'anki', { cask: true });

		await open('https://ankiweb.net/shared/info/2055492159');
		await pressToContinue(
			context,
			"when you've installed the AnkiConnect plugin."
		);
	},
});

export default ankiBootstrapper;
