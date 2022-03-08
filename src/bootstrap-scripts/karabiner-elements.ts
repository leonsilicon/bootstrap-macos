import { brewInstall } from '~/utils/brew.js';
import { sendMessage } from '~/utils/message.js';
import { openSystemPreferences } from '~/utils/settings.js';
import { SPPaneAnchors, SPPanes } from '~generated/system-preferences.js';

export async function installKarabinerElements() {
	await brewInstall('karabiner-elements', { cask: true });
	await openSystemPreferences({
		pane: SPPanes.security,
		anchor: ''
	})
	await sendMessage('');
}
