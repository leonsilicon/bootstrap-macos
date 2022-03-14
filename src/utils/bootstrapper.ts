import type {
	Bootstrapper,
	CreateBootstrapperProps,
} from '~/types/bootstrapper.js';
import type { BootstrapperContext } from '~/types/context.js';

export function createBootstrapper<BootstrapArgs>(
	props: CreateBootstrapperProps<BootstrapArgs>
): Bootstrapper<BootstrapArgs> {
	return {
		name: props.name,
		description: props.description,
		link: props.link,
		needsManualIntervention: props.needsManualIntervention ?? false,
		needsReboot: props.needsReboot,
		async bootstrap(
			context: BootstrapperContext,
			args?: BootstrapArgs & {
				force?: boolean;
			}
		) {
			if (args?.force) {
				await props.bootstrap(context, args as any);
			} else {
				if (!(await props.skip?.(context, args as any))) {
					await props.bootstrap(context, args as any);
				}
			}
		},
	};
}
