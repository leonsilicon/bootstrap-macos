import { installPyenv } from '~/bootstrap-scripts/python/pyenv.js';

type InstallPythonProps = {
	version: string;
};
export async function installPython({ version }: InstallPythonProps) {
	await installPyenv();
}
