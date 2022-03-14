import { test } from 'vitest';
import dopplerBootstrapper from '~/bootstrappers/doppler.js';

export function dopplerBootstrapperTest() {
	test('doppler bootstrapper', async () => {
		await dopplerBootstrapper.bootstrap({
			dryRun: false,
		});
	});
}
