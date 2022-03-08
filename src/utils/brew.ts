import { runCommand } from '~/utils/command.js';

export function useBrew() {
	return true;
}

export function brewInstall(pkg: string, options: { cask?: boolean } = {}) {
	if (options.cask) {
		runCommand({
			description: `Installing cask ${pkg} with Homebrew`,
			command: ['brew', 'install', '--cask', pkg],
		});
	} else {
		runCommand({
			description: `Installing ${pkg} with Homebrew`,
			command: ['brew', 'install', pkg],
		});
	}
}
