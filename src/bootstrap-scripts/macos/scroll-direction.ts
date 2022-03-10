import pWaitFor from 'p-wait-for';
import type { ElementReference } from '~/types/element-path.js';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { toggleCheckbox } from '~/utils/gui-scripting/checkbox.js';
import { clickElement, getUIElements } from '~/utils/gui-scripting/ui.js';
import { openSystemPreferencesPane } from '~/utils/system-preferences.js';

type BootstrapProps = {
	value: boolean;
};
export const scrollDirectionBootstrapper = createBootstrapper({
	async bootstrap(props?: BootstrapProps) {
		await openSystemPreferencesPane({
			paneId: 'com.apple.preference.trackpad',
		});
		const uiElements = await getUIElements('System Preferences');
		const scrollAndZoomButton = uiElements.find((uiElement) =>
			uiElement.path.some((pathPart) => pathPart.name.includes('Scroll & Zoom'))
		);

		if (scrollAndZoomButton === undefined) {
			throw new Error('"Scroll & Zoom" button not found.');
		}

		await clickElement(scrollAndZoomButton);
		const scrollDirectionNaturalCheckbox = await pWaitFor<ElementReference>(
			async (resolve) => {
				const uiElements = await getUIElements('System Preferences');
				const scrollDirectionNaturalCheckbox = uiElements.find((uiElement) =>
					uiElement.path.some(
						(part) => part.type === 'checkbox' && part.name === '1'
					)
				);
				return scrollDirectionNaturalCheckbox
					? resolve(scrollDirectionNaturalCheckbox)
					: false;
			}
		);

		await toggleCheckbox(scrollDirectionNaturalCheckbox, props?.value ?? true);
	},
});
