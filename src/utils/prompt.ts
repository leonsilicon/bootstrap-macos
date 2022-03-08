type PromptYesNoOptions = {
	message: string;
};

export async function promptYesNo(
	options: PromptYesNoOptions,
	cb: () => Promise<void> | void
) {
	console.info(options.message);
	await cb();
}
