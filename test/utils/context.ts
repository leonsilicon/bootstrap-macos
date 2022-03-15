import type { BootstrapperContext } from '~/types/context.js';

export function getTestBootstrapperContext(): BootstrapperContext {
	return {
		dryRun: false,
	};
}
