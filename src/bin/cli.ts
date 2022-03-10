import * as fs from 'node:fs';
import * as path from 'node:path';
import inquirer from 'inquirer';
import PressToContinue from 'inquirer-press-to-continue';
import AutocompletePrompt from 'inquirer-autocomplete-prompt';
import { join } from 'desm';
import type { Bootstrapper } from '~/types/bootstrapper.js';

inquirer.registerPrompt('press-to-continue', PressToContinue);
inquirer.registerPrompt('autocomplete', AutocompletePrompt);

const bootstrappersFolder = join(import.meta.url, '../bootstrappers');

declare module 'inquirer' {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface QuestionMap<T> {
		autocomplete: AutocompletePrompt.AutocompleteQuestionOptions;
	}
}

const bootstrapperFiles = fs.readdirSync(bootstrappersFolder);

const bootstrappersMap = Object.fromEntries(
	await Promise.all(
		bootstrapperFiles.map(async (bootstrapperFilePath) => {
			const filename = path.parse(bootstrapperFilePath).name;
			const { default: bootstrapper } = (await import(
				`../bootstrappers/${filename}.js`
			)) as { default: Bootstrapper<unknown> };
			return [bootstrapper.name, bootstrapper] as const;
		})
	)
);

const { selectedBootstrapperNames } = await inquirer.prompt<{
	selectedBootstrapperNames: string[];
}>({
	name: 'selectedBootstrapperNames',
	type: 'autocomplete',
	source: async (_selectedBootstrapperNames, input) =>
		Object.values(bootstrappersMap)
			.filter(
				(bootstrapper) =>
					bootstrapper.name.toLowerCase().includes(input ?? '') ||
					bootstrapper.description?.toLowerCase().includes(input ?? '')
			)
			.map((bootstrapper) => bootstrapper.name),
});

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
