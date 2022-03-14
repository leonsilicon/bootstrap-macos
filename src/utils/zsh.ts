import * as path from 'node:path';
import * as os from 'node:os';
import * as fs from 'node:fs';
import onetime from 'onetime';
import { outdent } from 'outdent';
import type { AddToFileOptions } from '~/utils/file.js';
import { addToFile } from '~/utils/file.js';
import type { BootstrapperContext } from '~/types/context.js';
import { gitClone } from '~/utils/git.js';

export const getZshrcPath = onetime(() => path.join(os.homedir(), '.zshrc'));

type AddToZshrcOptions = Omit<AddToFileOptions, 'filePath'>;
export async function addToZshrc(
	context: BootstrapperContext,
	props: AddToZshrcOptions
) {
	await addToFile(context, {
		...props,
		filePath: getZshrcPath(),
	});
}

export const getZProfilePath = onetime(() =>
	path.join(os.homedir(), '.zprofile')
);

type AddToZprofileOptions = Omit<AddToFileOptions, 'filePath'>;
export async function addToZprofile(
	context: BootstrapperContext,
	props: AddToZprofileOptions
) {
	await addToFile(context, {
		...props,
		filePath: getZProfilePath(),
	});
}

type AddOhMyZshPluginToZshrcProps = {
	pluginName: string;
};
export async function addOhMyZshPluginToZshrc(
	context: BootstrapperContext,
	props: AddOhMyZshPluginToZshrcProps
) {
	if (context.dryRun) return;
	const zshrcPath = getZshrcPath();
	const zshrc = await fs.promises.readFile(zshrcPath, 'utf-8');
	const pluginsMatch = (/plugins=\((.*)\)/s.exec(zshrc)) ?? undefined;

	if (pluginsMatch === undefined) {
		await addToZshrc(context, {
			content: outdent`
				plugins=(
					${props.pluginName}
				)
			`,
			prepend: true,
		});
	} else {
		const plugins = pluginsMatch[1]?.split(/\s/) ?? [];
		plugins.push(props.pluginName);
		const newPluginsString = outdent`
			plugins=(
				${plugins.join('\n')}
			)
		`;

		await addToZshrc(context, {
			content: newPluginsString,
			replace: {
				start: pluginsMatch.index,
				end: pluginsMatch.index + pluginsMatch[0]!.length,
			},
		});
	}
}

type GitCloneOhMyZshPluginProps = {
	repository: string;
	pluginName: string;
};
export async function addOhMyZshPlugin(
	context: BootstrapperContext,
	{ repository, pluginName }: GitCloneOhMyZshPluginProps
) {
	await gitClone(context, {
		repository,
		destinationDir: path.join(
			os.homedir(),
			'.oh-my-zsh/custom/plugins',
			pluginName
		),
	});

	await addOhMyZshPluginToZshrc(context, { pluginName });
}
