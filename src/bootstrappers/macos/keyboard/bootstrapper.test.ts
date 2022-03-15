import { test } from 'vitest';
import { getTestBootstrapperContext } from '~test/utils/context.js';
import macosKeyboardBootstrapper from '~/bootstrappers/macos/keyboard/bootstrapper.js';

test('macos keyboard bootstrapper', async () => {
	await macosKeyboardBootstrapper.bootstrap(getTestBootstrapperContext());
});
