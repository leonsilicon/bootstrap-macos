import fs from 'node:fs';
import type { SyncOptions } from 'execa';
import { execaCommand, execa } from 'execa';
import { outdent } from 'outdent';

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

export async function runCommand(props: RunCommandProps) {
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

function cleanInput(s: string) {
	if (/[^\w/:=-]/.test(s)) {
		s = "'" + s.replace(/'/g, "'\\''") + "'";
		s = s
			.replace(/^(?:'')+/g, '') // unduplicate single-quote at the beginning
			.replace(/\\'''/g, "\\'"); // remove non-escaped single-quote if there are enclosed between 2 escaped
	}

	return s;
}

export async function commandExists(commandName: string): Promise<boolean> {
	try {
		// Check if file exists (i.e. command is an absolute path)
		await fs.promises.access(commandName, fs.constants.F_OK);
	} catch {
		// If the file doesn't exist, check if command exists in path
		try {
			const cleanedCommandName = cleanInput(commandName);
			const { stdout } = await execaCommand(outdent`
				command -v ${cleanedCommandName} 2>/dev/null && { echo >&1 '${cleanedCommandName}'; exit 0; }
			`);

			// Non-empty stdout means that the command exists
			return Boolean(stdout);
		} catch {
			return false;
		}
	}

	// If the command is a file, check if the file is executable
	try {
		await fs.promises.access(
			commandName,
			// eslint-disable-next-line no-bitwise
			fs.constants.F_OK | fs.constants.X_OK
		);
		return true;
	} catch {
		return false;
	}
}
