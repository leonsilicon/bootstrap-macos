import path from 'node:path';
import { dirname, join } from 'desm';
import recursiveReadDir from 'recursive-readdir';
import type { Bootstrapper } from '~/types/bootstrapper.js';

const bootstrappersFolder = join(import.meta.url, '../../src/bootstrappers');
const bootstrapperFiles = await recursiveReadDir(bootstrappersFolder);

const bootstrapperTests = (
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
			)?.[1];

			if (bootstrapperTest === undefined) {
				return undefined;
			}

			return bootstrapperTest;
		})
	)) as Array<Bootstrapper<unknown>>
).filter((value) => value !== undefined);

for (const bootstrapperTest of bootstrapperTests) {
	bootstrapperTest();
}
