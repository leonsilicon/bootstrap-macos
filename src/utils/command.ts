import type { SyncOptions } from 'execa';
import { execaCommandSync } from 'execa';

type RunCommandProps = {
	/**
	 * The link where the install command can be found.
	 */
	installLink?: string;

	/**
	 * A brief description about what the command does.
	 */
	description?: string;

	/**
	 * The installation command to run
	 */
	command: string;
} & SyncOptions;

export function runCommand(props: RunCommandProps) {
	const { installLink, command, description, ...execaOptions } = props;
	console.info(description, installLink);
	return execaCommandSync(command, execaOptions);
}
