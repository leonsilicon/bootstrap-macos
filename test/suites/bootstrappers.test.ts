import path from 'node:path';
import { dirname, join } from 'desm';
import recursiveReadDir from 'recursive-readdir';
import type { Bootstrapper } from '~/types/bootstrapper.js';

const bootstrappersFolder = join(import.meta.url, '../../src/bootstrappers');
const bootstrapperFiles = await recursiveReadDir(bootstrappersFolder);

const bootstrapperTests = Object.fromEntries(
	(
		(await Promise.all(
			bootstrapperFiles.map(async (bootstrapperFilePath) => {
				const bootstrapperPath = path.relative(
					dirname(import.meta.url),
					path.dirname(bootstrapperFilePath)
				);
				const filename = path.parse(bootstrapperFilePath).name;
				const bootstrapperModule = (await import(
					`${bootstrapperPath}/${filename}.js`
				)) as { default: Bootstrapper<unknown> };

				const bootstrapperTest = Object.entries(bootstrapperModule).find(
					([exportName, _exportValue]) => exportName.endsWith('Test')
				)![1];

				if (bootstrapperTest === undefined) {
					return undefined;
				}

				const bootstrapper = bootstrapperModule.default;
				return [bootstrapper.name, bootstrapper] as const;
			})
		)) as Array<[string, Bootstrapper<unknown>]>
	).filter((value) => value !== undefined)
);

for (const bootstrapperTest of bootstrapperTests) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	bootstrapperTest();
}
