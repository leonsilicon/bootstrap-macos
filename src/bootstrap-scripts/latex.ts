/* eslint-disable @typescript-eslint/naming-convention */

import { brewInstall } from '~/utils/brew.js';
import { runCommand, runCommands } from '~/utils/command.js';

export async function installLatex() {
	brewInstall('mactex', { cask: true });

	runCommands({
		description: 'Installing Perl packages needed for latexindent',
		commands: ['cpan File::HomeDir', 'cpan YAML::Tiny'],
		extendEnv: true,
		env: {
			// https://stackoverflow.com/a/18463973
			PERL_MM_USE_DEFAULT: '1',
		},
	});

	runCommand({
		description: 'Update all LaTeX packages',
		command: 'tlmgr update --self --all',
		sudo: true,
	});
}
