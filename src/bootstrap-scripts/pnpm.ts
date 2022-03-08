import { runCommand } from '~/utils/command.js';

runCommand({
	description: 'Install pnpm',
	command: 'curl -fsSL https://get.pnpm.io/install.sh | sh -',
	shell: true,
});
