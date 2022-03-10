// TODO: download from App Store or use third-party XCode manager package?

import { createBootstrapper } from '~/utils/bootstrapper.js';
import { runCommand } from '~/utils/command.js';

export const xcodeBootstrapper = createBootstrapper({
	skip() {
		throw new Error('TODO: not implemented');
	},
	async bootstrap() {
		await runCommand({
			command: 'xcodebuild -license accept',
			sudo: true,
		});

		await runCommand({
			command: 'softwareupdate --all --install --force',
		});
	},
});
