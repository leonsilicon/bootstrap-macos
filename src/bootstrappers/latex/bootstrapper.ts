import { pnpmBootstrapper } from '~/bootstrappers/pnpm/bootstrapper.js';
import pythonPipBootstrapper from '~/bootstrappers/python-pip/bootstrapper.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';
import { runCommand, runCommands } from '~/utils/command.js';
import { sendMessage } from '~/utils/message.js';
import { pnpmInstall } from '~/utils/pnpm.js';
import { promptYesNo } from '~/utils/prompt.js';
import { pipInstall } from '~/utils/python.js';

export const latexBootstrapper = createBootstrapper({
	name: 'LaTeX (macTeX)',
	async bootstrap(context) {
		await brewInstall(context, 'mactex', { cask: true });

		await runCommands(context, {
			description: 'Installing Perl packages needed for latexindent',
			commands: [
				'cpan File::HomeDir',
				'cpan YAML::Tiny',
				'cpan Unicode::GCString',
			],
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
			await sendMessage(context, {
				message: `Installing latex-workflow, ${latexWorkflowDescription}.`,
				link: 'https://github.com/leonzalion/latex-workflow#readme',
			});
			await pnpmInstall(context, 'latex-workflow');
		}

		await pythonPipBootstrapper.bootstrap(context, { python2: true });
		await runCommand(context, {
			description: 'Installing pygments (needed for the minted LaTeX package)',
			command: 'python2 -m pip install pygments',
		});

		await runCommand(context, {
			description: 'Update all LaTeX packages',
			command: 'tlmgr update --self --all',
			sudo: true,
		});

		// todo: install fonts
	},
});

export default latexBootstrapper;
