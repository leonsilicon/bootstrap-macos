import * as fs from 'node:fs';
import type { ExecaChildProcess, SyncOptions } from 'execa';
import { execa, execaCommand } from 'execa';
import { outdent } from 'outdent';
import type { BootstrapperContext } from '~/types/context.js';

function cleanInput(s: string) {
	if (/[^\w/:=-]/.test(s)) {
		s = "'" + s.replace(/'/g, "'\\''") + "'";
		s = s
			.replace(/^(?:'')+/g, '') // unduplicate single-quote at the beginning
			.replace(/\\'''/g, "\\'"); // remove non-escaped single-quote if there are enclosed between 2 escaped
	}

	return s;
}

export async function commandExists(
	context: BootstrapperContext,
	commandName: string
) {
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

export type Command = string | string[];
export type RunCommandProps = {
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

/* eslint-disable @typescript-eslint/no-unsafe-return */

// Returns `undefined` in a dry run
export function runCommand<Context extends BootstrapperContext>(
	context: Context,
	props: RunCommandProps
): Context['dryRun'] extends true ? undefined : ExecaChildProcess {
	if (context.dryRun) {
		return undefined as any;
	} else {
		const { link, command, description, ...execaOptions } = props;
		console.info(description, link);
		if (typeof command === 'string') {
			return execaCommand(command, execaOptions) as any;
		} else {
			if (command[0] === undefined) {
				throw new Error('At least one command must be specified.');
			}

			return execa(command[0], command.slice(1), execaOptions) as any;
		}
	}
}

/* eslint-enable @typescript-eslint/no-unsafe-return */

export type RunCommandsProps = Omit<RunCommandProps, 'command'> & {
	commands: Command[];
};
export async function runCommands(
	context: BootstrapperContext,
	props: RunCommandsProps
): Promise<void> {
	for (const command of props.commands) {
		// eslint-disable-next-line no-await-in-loop
		await runCommand(context, { ...props, command });
	}
}
