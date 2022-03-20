import * as path from 'node:path';
import * as os from 'node:os';
import open from 'open';
import { pythonBootstrapper } from '~/bootstrappers/python/bootstrapper.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { runCommands } from '~/utils/command.js';
import { sendMessage } from '~/utils/message.js';
import { pressToContinue } from '~/utils/prompt.js';

export const davinciResolveBootstrapper = createBootstrapper({
	name: 'Davinci Resolve',
	needsManualIntervention: true,
	async bootstrap(context) {
		await open('https://www.blackmagicdesign.com/ca/products/davinciresolve/');

		await pressToContinue(
			context,
			"when you're done installing DaVinci Resolve"
		);

		await sendMessage(context, 'Installing Python 3.6 for DaVinci Scripting');
		await pythonBootstrapper.bootstrap(context, { version: '3.6.15' });

		/*
		Based on `dtrace`, it looks like fuscript checks the following folder for Python 3.6

		10468/0xb7d3:  stat64("/Library/Frameworks/Python.framework/Versions/3.6/python\0", 0x30D784160, 0x0)		 = -1 Err#2

		However, pyenv doesn't install to this folder, so we need to symlink the pyenv Python 3.6 installation to this folder.

		See: https://video.stackexchange.com/questions/32458/davinci-resolve-python-3-6-not-found
		*/

		await runCommands(context, {
			commands: [
				[
					'ln',
					'-s',
					path.join(os.homedir(), '.pyenv/versions/3.6.15'),
					'/Library/Frameworks/Python.framework/Versions/3.6',
				],
				[
					'ln',
					'-s',
					path.join(os.homedir(), '.pyenv/versions/3.6.15/bin/python'),
					'/Library/Frameworks/Python.framework/Versions/3.6/python',
				],
			],
			sudo: true,
		});
	},
});

export default davinciResolveBootstrapper;
