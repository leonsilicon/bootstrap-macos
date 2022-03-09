import { brewInstall } from '~/utils/brew.js';
import { giveAppPermissionAccess } from '~/utils/system-preferences.js';

export async function installKarabinerElements() {
	await brewInstall('karabiner-elements', { cask: true });
	await giveAppPermissionAccess({
		appName: 'karabiner_grabber',
		permissionName: 'Input Monitoring'
	})
	await giveAppPermissionAccess({
		appName: 'karabiner_observer',
		permissionName: 'Input Monitoring'
	})
}
