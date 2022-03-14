import type { BootstrapperContext } from '~/types/context.js';

export type Bootstrapper<BootstrapArgs> = {
	name: string;
	link?: string;
	description?: string;
	needsManualIntervention: boolean;
	needsReboot: boolean;
	bootstrap(
		context: BootstrapperContext,
		// Bootstrapper might not be called with any args
		args?: BootstrapArgs
	): void | Promise<void>;
};

export type CreateBootstrapperProps<BootstrapArgs> = {
	name: string;
	description?: string;
	link?: string;
	needsManualIntervention?: boolean;
	needsReboot?: boolean;
	skip?(
		context: BootstrapperContext,
		args: BootstrapArgs
	): boolean | Promise<boolean>;
	bootstrap(
		context: BootstrapperContext,
		args: BootstrapArgs
	): void | Promise<void>;
};
