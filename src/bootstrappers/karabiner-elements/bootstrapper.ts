import { gokuRakuJoudoBootstrapper } from '~/bootstrappers/goku-raku-joudo/goku-raku-joudo.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';
import { promptYesNo } from '~/utils/prompt.js';
import { giveAppPermissionAccess } from '~/utils/system-preferences.js';

export const karabinerElementsBootstrapper = createBootstrapper({
	name: 'Karabiner Elements',
	async bootstrap(context) {
		await brewInstall(context, 'karabiner-elements', { cask: true });

		await giveAppPermissionAccess(context, {
			appName: 'karabiner_grabber',
			permissionName: 'Input Monitoring',
		});
		await giveAppPermissionAccess(context, {
			appName: 'karabiner_observer',
			permissionName: 'Input Monitoring',
		});

		if (
			await promptYesNo(context, {
				message:
					'Would you like to install GokuRakuJoudo, a utility for Karabiner that allows you to write more concise configuration files?',
			})
		) {
			await gokuRakuJoudoBootstrapper.bootstrap(context);
		}
	},
});

export default karabinerElementsBootstrapper;
