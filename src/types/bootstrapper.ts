import type { BootstrapperContext } from '~/types/context.js';

export type Bootstrapper<BootstrapArgs> = {
	name: string;
	description?: string;
	manualInterventionNeeded: boolean;
	bootstrap(
		context: BootstrapperContext,
		// Bootstrapper might not be called with any args
		args?: BootstrapArgs
	): void | Promise<void>;
};

export type CreateBootstrapperProps<BootstrapArgs> = {
	name: string;
	description?: string;
	manualInterventionNeeded?: boolean;
	skip?(
		context: BootstrapperContext,
		args: BootstrapArgs
	): boolean | Promise<boolean>;
	bootstrap(
		context: BootstrapperContext,
		args: BootstrapArgs
	): void | Promise<void>;
};
