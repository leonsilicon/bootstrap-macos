import type { Bootstrapper } from '~/types/bootstrapper.js';
import type { BootstrapperContext } from '~/types/context.js';
import { promptAdminCredentials } from '~/utils/prompt.js';

export async function bootstrapCli(
	bootstrappers: Array<Bootstrapper<unknown>>
) {
	const adminCredentialsNeeded = false;

	const dryRunBootstrapContext: BootstrapperContext = {
		dryRun: true,
		dryRunContext: {
			commands: [],
			needsAdminCredentials: false,
			modifiedFiles: [],
		},
	};

	// Do a dry-run
	for (const bootstrapper of bootstrappers) {
		// eslint-disable-next-line no-await-in-loop
		await bootstrapper.bootstrap(dryRunBootstrapContext);
	}

	const bootstrapContext: BootstrapperContext = {
		dryRun: false,
		adminCredentials: undefined,
	};

	if (adminCredentialsNeeded) {
		const { username, password } = await promptAdminCredentials();
		bootstrapContext.adminCredentials = { username, password };
	}

	// Do the real-run
	for (const bootstrapper of bootstrappers) {
		// eslint-disable-next-line no-await-in-loop
		await bootstrapper.bootstrap(bootstrapContext);
	}
}
