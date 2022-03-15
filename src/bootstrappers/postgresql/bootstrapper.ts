import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';
import { runCommand } from '~/utils/command.js';
import { sendMessage } from '~/utils/message.js';

export const postgresqlBootstrapper = createBootstrapper({
	name: 'PostgreSQL',
	async bootstrap(context) {
		await sendMessage(context, {
			message: 'Installing PostgreSQL',
			link: 'https://wiki.postgresql.org/wiki/Homebrew',
		});

		await brewInstall(context, 'postgresql');
		await runCommand(context, {
			command: 'brew services run postgresql',
		});
	},
});

export default postgresqlBootstrapper;
