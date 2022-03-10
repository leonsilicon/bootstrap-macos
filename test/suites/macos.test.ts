import { afterAll, test } from 'vitest';
import { scrollDirectionBootstrapper } from '~/bootstrappers/macos/scroll-direction.js';

test('scroll direction', async () => {
	afterAll(async () => {
		await scrollDirectionBootstrapper.bootstrap({ value: false });
	});

	await scrollDirectionBootstrapper.bootstrap();
});
