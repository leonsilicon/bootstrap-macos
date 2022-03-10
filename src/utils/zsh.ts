import * as path from 'node:path';
import * as os from 'node:os';
import onetime from 'onetime';
import type { AddToFileOptions } from '~/utils/file.js';
import { addToFile } from '~/utils/file.js';

export const getZshrcPath = onetime(() => path.join(os.homedir(), '.zshrc'));

type AddToZshrcOptions = Omit<AddToFileOptions, 'filePath'>;
export async function addToZshrc(props: AddToZshrcOptions) {
	await addToFile({
		...props,
		filePath: getZshrcPath(),
	});
}

export const getZProfilePath = onetime(() =>
	path.join(os.homedir(), '.zprofile')
);

type AddToZprofileOptions = Omit<AddToFileOptions, 'filePath'>;
export async function addToZprofile(props: AddToZprofileOptions) {
	await addToFile({
		...props,
		filePath: getZProfilePath(),
	});
}