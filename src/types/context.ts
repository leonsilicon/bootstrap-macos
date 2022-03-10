import type { AdminCredentials } from '~/types/credentials.js';
import type { Command } from '~/utils/command.js';

type BootstrapperDryRunContext = {
	needsAdminCredentials: boolean;
	commands: Command[];
	modifiedFiles: string[];
};

export type BootstrapperContext =
	| {
			dryRun: true;
			dryRunContext: BootstrapperDryRunContext;
	  }
	| {
			dryRun: false;
			adminCredentials?: AdminCredentials;
	  };
