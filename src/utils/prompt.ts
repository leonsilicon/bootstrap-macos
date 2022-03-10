import inquirer from 'inquirer';
import type { KeyDescriptor } from 'inquirer-press-to-continue';
import type { BootstrapperContext } from '~/types/context.js';
import type { AdminCredentials } from '~/types/credentials.js';

export type PromptYesNoProps = {
	message: string;
};
export async function promptYesNo(
	context: BootstrapperContext,
	props: PromptYesNoProps
): Promise<boolean> {
	if (context.dryRun) {
		return true;
	}

	const { response } = await inquirer.prompt<{ response: boolean }>({
		message: props.message,
		type: 'confirm',
		name: 'response',
	});
	return response;
}

export async function pressToContinue(
	context: BootstrapperContext,
	conditionMessage: string
): Promise<KeyDescriptor> {
	if (context.dryRun) {
		return {
			key: {
				name: 'y',
			},
			value: 'y',
		};
	}

	const { response } = await inquirer.prompt<{ response: KeyDescriptor }>({
		name: 'response',
		pressToContinueMessage: `Press enter to continue ${conditionMessage}`,
		type: 'press-to-continue',
		enter: true,
	});
	return response;
}

export async function getAdminCredentials(
	context: BootstrapperContext
): Promise<AdminCredentials> {
	if (context.dryRun) {
		context.dryRunContext.needsAdminCredentials = true;
		return { username: 'username', password: 'password' };
	}

	if (context.adminCredentials === undefined) {
		const { username, password } = await promptAdminCredentials();
		context.adminCredentials = { username, password };
	}

	return context.adminCredentials;
}

export async function promptAdminCredentials() {
	const { username, password } = await inquirer.prompt<{
		username: string;
		password: string;
	}>([
		{
			type: 'input',
			message: "Please enter an administrator's username",
			name: 'username',
		},
		{
			type: 'password',
			message: "Please enter an administrator's password",
			name: 'password',
		},
	]);

	return { username, password };
}

type PromptInputProps = {
	message: string;
};
export async function promptInput(
	context: BootstrapperContext,
	props: PromptInputProps
): Promise<string | undefined> {
	if (context.dryRun) {
		return undefined;
	}

	const { response } = await inquirer.prompt<{ response: string }>({
		name: 'response',
		message: props.message,
		type: 'input',
	});
	return response;
}
