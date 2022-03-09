import { brewInstall } from '~/utils/brew.js';
import { sendMessage } from '~/utils/message.js';
import { giveAppPermissionAccess, openSystemPreferencesPane } from '~/utils/system-preferences.js';

export async function installKarabinerElements() {
	await brewInstall('karabiner-elements', { cask: true });
	await giveAppPermissionAccess({
		appName: 'karabiner_grabber'
	})
	await
}
