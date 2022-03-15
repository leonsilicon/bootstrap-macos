import { outdent } from 'outdent';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';
import { runCommand } from '~/utils/command.js';
import { addZshAlias } from '~/utils/zsh.js';

export const gitBootstrapper = createBootstrapper({
	name: 'git',
	async bootstrap(context) {
		await runCommand(context, {
			description: 'Set git default branch to main',
			command: 'git config --global init.defaultBranch main',
		});

		await runCommand(context, {
			description: 'Set git pull configuration',
			command: 'git config pull.rebase true',
		});

		await addZshAlias(context, {
			name: 'git-largest-files',
			value: outdent`
				git rev-list --objects --all |
				  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' |
				  sed -n 's/^blob //p' |
				  sort --numeric-sort --key=2 |
				  cut -c 1-12,41- |
				  $(command -v gnumfmt || echo numfmt) --field=2 --to=iec-i --suffix=B --padding=7 --round=nearest
			`,
		});

		await brewInstall(context, 'git-subrepo');
	},
});

export default gitBootstrapper;
