import type { BootstrapperContext } from '~/types/context.js';

type SendMessageProps = {
	message: string;
	link?: string;
};
export async function sendMessage(
	context: BootstrapperContext,
	propsOrMessage: string | SendMessageProps
) {
	if (context.dryRun) {
		return;
	}

	if (typeof propsOrMessage === 'string') {
		console.info(propsOrMessage);
	} else {
		console.info(propsOrMessage.message);
	}
}
