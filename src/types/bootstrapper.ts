export type Bootstrapper<BootstrapArgs> = {
	skip?(): boolean | Promise<boolean>;
	bootstrap(args?: BootstrapArgs): void | Promise<void>;
};
