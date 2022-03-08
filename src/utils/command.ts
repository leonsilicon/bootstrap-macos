import type { SyncOptions } from 'execa';
import { execaCommand, execa } from 'execa';

type Command = string | string[];

type RunCommandProps = {
	/**
	 * A link where more information about the command can be found.
	 */
	link?: string;

	/**
	 * A brief description about what the command does.
	 */
	description?: string;

	/**
	 * The installation command to run
	 */
	command: Command;

	/**
	 * Whether the command needs sudo or not
	 */
	sudo?: boolean;
} & SyncOptions;

export function runCommand(props: RunCommandProps) {
	const { link, command, description, ...execaOptions } = props;
	console.info(description, link);
	if (typeof command === 'string') {
		return execaCommand(command, execaOptions);
	} else {
		if (command[0] === undefined) {
			throw new Error('At least one command must be specified.');
		}

		return execa(command[0], command.slice(1), execaOptions);
	}
}

type RunCommandsProps = Omit<RunCommandProps, 'command'> & {
	commands: Command[];
};
export async function runCommands(props: RunCommandsProps) {
	for (const command of props.commands) {
		// eslint-disable-next-line no-await-in-loop
		await runCommand({ ...props, command });
	}
}
