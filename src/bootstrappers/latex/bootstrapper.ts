import { pnpmBootstrapper } from '~/bootstrappers/pnpm/pnpm.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';
import { runCommand, runCommands } from '~/utils/command.js';
import { promptYesNo } from '~/utils/prompt.js';

export const latexBootstrapper = createBootstrapper({
	name: 'LaTeX (macTeX)',
	async bootstrap(context) {
		await brewInstall(context, 'mactex', { cask: true });

		await runCommands(context, {
			description: 'Installing Perl packages needed for latexindent',
			commands: ['cpan File::HomeDir', 'cpan YAML::Tiny'],
			extendEnv: true,
			env: {
				// https://stackoverflow.com/a/18463973
				PERL_MM_USE_DEFAULT: '1',
			},
		});

		const latexWorkflowDescription =
			'a custom LaTeX workflow for compiling LaTeX documents';

		if (
			await promptYesNo(context, {
				message: `Do you wish to install latex-workflow, ${latexWorkflowDescription}?`,
			})
		) {
			await pnpmBootstrapper.bootstrap(context);

			await runCommand(context, {
				description: `Installing latex-workflow, ${latexWorkflowDescription}.`,
				link: 'https://github.com/leonzalion/latex-workflow#readme',
				command: 'pnpm install --global latex-workflow',
			});
		}

		await runCommand(context, {
			description: 'Update all LaTeX packages',
			command: 'tlmgr update --self --all',
			sudo: true,
		});

		// todo: install fonts
	},
});

export default latexBootstrapper;
