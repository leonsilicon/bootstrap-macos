import { getUIElements } from '~/utils/gui-scripting/ui.js';
import { giveAppPermissionAccess } from '~/utils/system-preferences.js';

const result = await getUIElements('System Preferences');
console.log(result)

// await giveAppPermissionAccess({
// 	appName: 'karabiner-grabber',
// 	permissionName: 'Input Monitoring',
// });
