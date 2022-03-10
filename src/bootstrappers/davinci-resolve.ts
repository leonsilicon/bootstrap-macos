import open from 'open';
import { pythonBootstrapper } from '~/bootstrappers/python/python.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { sendMessage } from '~/utils/message.js';
import { pressToContinue } from '~/utils/prompt.js';

export const davinciResolveBootstrapper = createBootstrapper({
	name: 'Davinci Resolve',
	manualInterventionNeeded: true,
	async bootstrap(context) {
		await open('https://www.blackmagicdesign.com/ca/products/davinciresolve/');

		await pressToContinue(
			context,
			"when you're done installing DaVinci Resolve"
		);

		await sendMessage(context, 'Installing Python 3.6 for DaVinci Scripting');
		await pythonBootstrapper.bootstrap(context, { version: '3.6' });
	},
});

export default davinciResolveBootstrapper;
