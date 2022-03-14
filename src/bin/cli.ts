import * as path from 'node:path';
import inquirer from 'inquirer';
import PressToContinue from 'inquirer-press-to-continue';
import SuperCheckboxPrompt from 'inquirer-super-checkbox-prompt';
import { join, dirname } from 'desm';
import recursiveReadDir from 'recursive-readdir';
import type { Bootstrapper } from '~/types/bootstrapper.js';

inquirer.registerPrompt('press-to-continue', PressToContinue);
inquirer.registerPrompt('super-checkbox', SuperCheckboxPrompt);

const bootstrappersFolder = join(import.meta.url, '../bootstrappers');

let bootstrapperFiles = await recursiveReadDir(bootstrappersFolder);
bootstrapperFiles = bootstrapperFiles.filter((bootstrapperFile) =>
	bootstrapperFile.endsWith('.ts')
);

const bootstrapperEntries = await Promise.all(
	bootstrapperFiles.map(async (bootstrapperFilePath) => {
		const bootstrapperPath = path.relative(
			dirname(import.meta.url),
			path.dirname(bootstrapperFilePath)
		);
		const filename = path.parse(bootstrapperFilePath).name;
		const { default: bootstrapper } = (await import(
			`${bootstrapperPath}/${filename}.js`
		)) as { default: Bootstrapper<unknown> };
		if (bootstrapper === undefined || bootstrapper.todo) {
			return undefined;
		}

		return [bootstrapper.name, bootstrapper] as const;
	})
);

const bootstrappersMap = Object.fromEntries(
	bootstrapperEntries.filter((entry) => entry !== undefined) as Array<
		[string, Bootstrapper<unknown>]
	>
);

const { selectedBootstrapperNames } = await inquirer.prompt<{
	selectedBootstrapperNames: string[];
}>({
	name: 'selectedBootstrapperNames',
	message: 'Select the bootstrappers you want to run',
	type: 'super-checkbox',
	searchable: true,
	source: async (_selectedBootstrapperNames, input) =>
		Object.values(bootstrappersMap)
			.filter(
				(bootstrapper) =>
					bootstrapper.name.toLowerCase().includes(input ?? '') ||
					bootstrapper.description?.toLowerCase().includes(input ?? '')
			)
			.map((bootstrapper) => bootstrapper.name),
});

console.log(selectedBootstrapperNames);

const selectedBootstrappers = selectedBootstrapperNames.map(
	(selectedBootstrapperName) => bootstrappersMap[selectedBootstrapperName]!
);

for (const bootstrapper of selectedBootstrappers) {
	try {
		// eslint-disable-next-line no-await-in-loop
		await bootstrapper.bootstrap({
			dryRun: false,
		});
	} catch (error: unknown) {
		console.error(
			`Bootstrapper ${bootstrapper.name} failed with error: ${
				(error as Error).message
			}. Skipping.`
		);
	}
}
