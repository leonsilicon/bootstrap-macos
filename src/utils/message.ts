import type { BootstrapperContext } from '~/types/context.js';

export async function sendMessage(
	context: BootstrapperContext,
	message: string
) {
	if (context.dryRun) {
		return;
	}

	console.info(message);
}
