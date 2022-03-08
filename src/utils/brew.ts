import { runCommand } from '~/utils/command.js';

export function useBrew() {
	return true;
}

export async function brewInstall(
	pkg: string,
	options: { cask?: boolean } = {}
) {
	if (options.cask) {
		await runCommand({
			description: `Installing cask ${pkg} with Homebrew`,
			command: ['brew', 'install', '--cask', pkg],
		});
	} else {
		await runCommand({
			description: `Installing ${pkg} with Homebrew`,
			command: ['brew', 'install', pkg],
		});
	}
}
