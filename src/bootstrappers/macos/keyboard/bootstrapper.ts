import { createBootstrapper } from '~/utils/bootstrapper.js';
import { toggleCheckbox } from '~/utils/gui-scripting/checkbox.js';
import { getElements } from '~/utils/gui-scripting/ui.js';
import { openSystemPreferencesPane } from '~/utils/system-preferences.js';

export const macosKeyboardBootstrapper = createBootstrapper({
	name: 'macOS Keyboard Settings',
	async bootstrap(context) {
		await openSystemPreferencesPane(context, {
			paneId: 'com.apple.preference.keyboard',
		});

		const elements = await getElements(context, 'System Preferences');
		const standardFunctionKeysCheckbox = elements.find((element) =>
			element.path.some(
				(part) =>
					part.type === 'checkbox' &&
					part.name.includes('standard function keys')
			)
		);

		if (standardFunctionKeysCheckbox === undefined) {
			throw new Error('Standard function keys checkbox not found.');
		}

		await toggleCheckbox(context, {
			element: standardFunctionKeysCheckbox,
			value: true,
		});
	},
});

export default macosKeyboardBootstrapper;
