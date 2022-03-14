import type { BootstrapperContext } from '~/types/context.js';
import { runCommand } from '~/utils/command.js';

type GitCloneProps = {
	repository: string;
	destinationDir: string;
};
export async function gitClone(
	context: BootstrapperContext,
	{ repository, destinationDir }: GitCloneProps
) {
	if (repository.startsWith('http://')) {
		throw new Error(
			'Refusing to clone http://-prefixed repository link. Please use https:// instead.'
		);
	}

	if (!repository.startsWith('https://')) {
		repository = `https://github.com/${repository}`;
	}

	await runCommand(context, {
		description: `Cloning repository ${repository}`,
		link: repository,
		command: ['git', 'clone', repository, destinationDir],
	});
}
