/* eslint-disable @typescript-eslint/naming-convention */

import { installPnpm } from '~/bootstrap-scripts/pnpm.js';
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

	const installLatexWorkflow = true;
	if (installLatexWorkflow) {
		await installPnpm();

		runCommand({
			description:
				'Installing latex-workflow, a custom LaTeX workflow for compiling LaTeX documents.',
			link: 'https://github.com/leonzalion/latex-workflow#readme',
			command: 'pnpm install --global latex-workflow',
		});
	}

	runCommand({
		description: 'Update all LaTeX packages',
		command: 'tlmgr update --self --all',
		sudo: true,
	});
}
