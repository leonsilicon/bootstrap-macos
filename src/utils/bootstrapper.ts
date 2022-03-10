import type {
	Bootstrapper,
	CreateBootstrapperProps,
} from '~/types/bootstrapper.js';
import type { BootstrapperContext } from '~/types/context.js';

export function createBootstrapper<BootstrapArgs>(
	bootstrapper: CreateBootstrapperProps<BootstrapArgs>
): Bootstrapper<BootstrapArgs> {
	return {
		manualInterventionNeeded: bootstrapper.manualInterventionNeeded ?? false,
		async bootstrap(
			context: BootstrapperContext,
			args?: BootstrapArgs & {
				force?: boolean;
			}
		) {
			if (args?.force) {
				await bootstrapper.bootstrap(context, args as any);
			} else {
				if (!(await bootstrapper.skip?.(context, args as any))) {
					await bootstrapper.bootstrap(context, args as any);
				}
			}
		},
	};
}
