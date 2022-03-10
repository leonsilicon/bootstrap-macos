import { gokuRakuJoudoBootstrapper } from './goku-raku-joudo.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';
import { promptYesNo } from '~/utils/input.js';
import { giveAppPermissionAccess } from '~/utils/system-preferences.js';

export const karabinerElementsBootstrapper = createBootstrapper({
	async bootstrap(context) {
		await brewInstall('karabiner-elements', { cask: true });

		await giveAppPermissionAccess(context, {
			appName: 'karabiner_grabber',
			permissionName: 'Input Monitoring',
		});
		await giveAppPermissionAccess(context, {
			appName: 'karabiner_observer',
			permissionName: 'Input Monitoring',
		});

		if (
			await promptYesNo({
				message:
					'Would you like to install GokuRakuJoudo, a utility for Karabiner that allows you to write more concise configuration files?',
			})
		) {
			await gokuRakuJoudoBootstrapper.bootstrap(context);
		}
	},
});
