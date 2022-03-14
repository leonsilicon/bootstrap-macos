import type { BootstrapperContext } from '~/types/context.js';

export type Bootstrapper<BootstrapArgs> = {
	name: string;
	description?: string;
	link?: string;
	/** The bootstrapper isn't finished */
	todo: boolean;
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
	todo?: boolean;
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
