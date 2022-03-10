export type Bootstrapper<BootstrapArgs> = {
	manualInterventionNeeded?: boolean;
	skip?(): boolean | Promise<boolean>;
	bootstrap(args?: BootstrapArgs): void | Promise<void>;
};
