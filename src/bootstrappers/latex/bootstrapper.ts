import * as os from 'node:os';
import { outdent } from 'outdent';
import pythonPipBootstrapper from '~/bootstrappers/python-pip/bootstrapper.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';
import { runCommand, runCommands } from '~/utils/command.js';
import { sendMessage } from '~/utils/message.js';
import { pnpmInstall } from '~/utils/pnpm.js';
import { promptYesNo } from '~/utils/prompt.js';
import { addToZshrc } from '~/utils/zsh.js';

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

		await sendMessage(context, {
			message:
				'The following environment variables are needed for latexindent to work within VSCode (something about latexindent being able to find the corresponding modules).',
			link: 'https://stackoverflow.com/a/32726325',
		});
		await addToZshrc(context, {
			content: outdent`
				export PATH="${os.homedir()}/perl5/bin\${PATH:+:\${PATH}}";
				export PERL5LIB="${os.homedir()}/perl5/lib/perl5\${PERL5LIB:+:\${PERL5LIB}}";
				export PERL_LOCAL_LIB_ROOT="${os.homedir()}/perl5\${PERL_LOCAL_LIB_ROOT:+:\${PERL_LOCAL_LIB_ROOT}}";
				export PERL_MB_OPT="--install_base \"${os.homedir()}/perl5\"";
				export PERL_MM_OPT="INSTALL_BASE=${os.homedir()}/perl5";
			`,
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
		await runCommands(context, {
			description: 'Installing pygments (needed for the minted LaTeX package)',
			commands: ['python2 -m pip install pygments', 'pip install pygments'],
		});

		await runCommand(context, {
			description: 'Update all LaTeX packages',
			command: 'tlmgr update --self --all',
			sudo: true,
		});

		await sendMessage(context, {
			message:
				'Installing Microsoft Office Fonts so that you can use fonts like Calibri inside LaTeX documents.',
		});
		await brewInstall(context, 'font-microsoft-office', { cask: true });
	},
});

export default latexBootstrapper;
