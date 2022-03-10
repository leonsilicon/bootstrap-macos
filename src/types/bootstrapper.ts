export type Bootstrapper<BootstrapArgs> = {
	manualInterventionNeeded?: boolean;
	skip?(args?: BootstrapArgs): boolean | Promise<boolean>;
	bootstrap(args?: BootstrapArgs): void | Promise<void>;
};
