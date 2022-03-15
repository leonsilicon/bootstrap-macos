import { test } from 'vitest';
import scrollDirectionBootstrapper from './bootstrapper.js';

test('sets scroll direction', async () => {
	await scrollDirectionBootstrapper.bootstrap({ dryRun: false });
});
