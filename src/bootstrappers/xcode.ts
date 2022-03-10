// TODO: download from App Store or use third-party XCode manager package?

import { createBootstrapper } from '~/utils/bootstrapper.js';
import { runCommand } from '~/utils/command.js';

export const xcodeBootstrapper = createBootstrapper({
	name: 'XCode',
	skip() {
		throw new Error('TODO: not implemented');
	},
	async bootstrap(context) {
		await runCommand(context, {
			command: 'xcodebuild -license accept',
			sudo: true,
		});

		await runCommand(context, {
			command: 'softwareupdate --all --install --force',
		});
	},
});

export default xcodeBootstrapper;
