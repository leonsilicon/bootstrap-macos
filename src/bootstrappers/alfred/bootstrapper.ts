import open from 'open';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';
import { pressToContinue } from '~/utils/prompt.js';

export const alfredBootstrapper = createBootstrapper({
	name: 'Alfred',
	needsManualIntervention: true,
	async bootstrap(context) {
		await brewInstall(context, 'alfred', { cask: true });
		await open('/Applications/Alfred 4.app');
		await pressToContinue(context, "when you've set your Alfred shortcut.");

		/*
		Powerpack needed
		await runCommand(context, {
			command: '',
			link: 'https://github.com/blacs30/bitwarden-alfred-workflow',
		});

		const filePath = await downloadGitHubLatestRelease(context, {
			repository: 'blacs30/bitwarden-alfred-workflow',
			fileName: 'bitwarden-alfred-workflow.aldredworkflow',
		});

		await giveAppPermissionAccess(context, {
			appName: 'Alfred 4',
			permissionName: 'Developer Tools',
		});
		*/
	},
});

export default alfredBootstrapper;
