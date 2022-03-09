import { giveAppPermissionAccess } from '~/utils/system-preferences.js';

await giveAppPermissionAccess({
	appName: 'karabiner-grabber',
	permissionName: 'Input Monitoring',
});
