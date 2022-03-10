import { installGokuRakuJoudo } from '~/bootstrap-scripts/karabiner-elements/goku-raku-joudo.js';
import { brewInstall } from '~/utils/brew.js';
import { promptYesNo } from '~/utils/prompt.js';
import { giveAppPermissionAccess } from '~/utils/system-preferences.js';

export async function installKarabinerElements() {
	await brewInstall('karabiner-elements', { cask: true });
	await giveAppPermissionAccess({
		appName: 'karabiner_grabber',
		permissionName: 'Input Monitoring',
	});
	await giveAppPermissionAccess({
		appName: 'karabiner_observer',
		permissionName: 'Input Monitoring',
	});

	if (
		await promptYesNo({
			message:
				'Would you like to install GokuRakuJoudo, a utility for Karabiner that allows you to write more concise configuration files?',
		})
	) {
		await installGokuRakuJoudo();
	}
}
