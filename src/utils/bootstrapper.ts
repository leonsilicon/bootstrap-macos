import type { Bootstrapper } from '~/types/bootstrapper.js';

export function createBootstrapper<BootstrapArgs>(
	bootstrapper: Bootstrapper<BootstrapArgs>
): Bootstrapper<BootstrapArgs> {
	return {
		manualInterventionNeeded: bootstrapper.manualInterventionNeeded ?? false,
		skip: bootstrapper.skip,
		async bootstrap(
			props?: Parameters<Bootstrapper<BootstrapArgs>['bootstrap']>['0'] & {
				force?: boolean;
			}
		) {
			if (props?.force) {
				await bootstrapper.bootstrap(props);
			} else {
				if (!(await bootstrapper.skip?.())) {
					await bootstrapper.bootstrap(props);
				}
			}
		},
	};
}
