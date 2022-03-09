import { promptAdminCredentials } from '~/utils/prompt.js';
import { giveAppPermissionAccess } from '~/utils/system-preferences.js';

await promptAdminCredentials();

await giveAppPermissionAccess({
	appName: 'karabiner_grabber',
	permissionName: 'Input Monitoring',
});
