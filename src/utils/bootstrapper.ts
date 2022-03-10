import type { Bootstrapper } from '~/types/bootstrapper.js';

export function createBootstrapper<T extends Bootstrapper<unknown>>(
	bootstrapper: T
) {
	return {
		skip: bootstrapper.skip,
		async bootstrap(
			props?: Parameters<T['bootstrap']>['0'] & { force?: boolean }
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
