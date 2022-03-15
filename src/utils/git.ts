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
	repository = gitRepositoryToUrl(repository);
	await runCommand(context, {
		description: `Cloning repository ${repository}`,
		link: repository,
		command: ['git', 'clone', repository, destinationDir],
	});
}

export function gitRepositoryToUrl(repository: string) {
	if (repository.startsWith('http://')) {
		throw new Error(
			'Refusing to clone http://-prefixed repository link. Please use https:// instead.'
		);
	}

	if (!repository.startsWith('https://')) {
		repository = `https://github.com/${repository}`;
	}

	return repository;
}

export function getRepositoryIdentifier(repository: string) {
	return gitRepositoryToUrl(repository).split('/').slice(-2).join('/');
}
