import inquirer from 'inquirer';
import onetime from 'onetime';

type PromptYesNoOptions = {
	message: string;
};

export async function promptYesNo(
	options: PromptYesNoOptions,
	cb: () => Promise<void> | void
) {
	console.info(options.message);
	await cb();
}

export const promptAdminCredentials = onetime(async () => {
	const { username, password } = await inquirer.prompt<{
		username: string;
		password: string;
	}>([
		{
			name: 'username',
			message: "Please enter an admin's username:",
			type: 'input',
		},
		{
			name: 'password',
			message: "Please enter an admin's password:",
			type: 'password',
		},
	]);

	return { username, password };
});
