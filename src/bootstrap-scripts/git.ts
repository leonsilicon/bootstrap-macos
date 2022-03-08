import { runCommand } from '~/utils/command.js';

runCommand({
	description: 'Set git default branch to main',
	command: 'git config --global init.defaultBranch main',
});

runCommand({
	description: 'Set git pull configuration',
	command: 'git config pull.rebase true',
});
