// TODO: download from App Store or use third-party XCode manager package?

import { runCommand } from '~/utils/command.js';

await runCommand({
	command: 'xcodebuild -license accept',
	sudo: true,
});

await runCommand({
	command: 'softwareupdate --all --install --force',
});
