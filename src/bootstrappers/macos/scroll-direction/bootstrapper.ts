import pWaitFor from 'p-wait-for';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { toggleCheckbox } from '~/utils/gui-scripting/checkbox.js';
import { clickElement, getElements } from '~/utils/gui-scripting/ui.js';
import { openSystemPreferencesPane } from '~/utils/system-preferences.js';

export const scrollDirectionBootstrapper = createBootstrapper<{
	value: boolean;
}>({
	name: 'macOS Scroll Direction Settings',
	async bootstrap(context, props) {
		await openSystemPreferencesPane(context, {
			paneId: 'com.apple.preference.trackpad',
		});
		const elements = await getElements(context, 'System Preferences');
		const scrollAndZoomButton = elements.find((element) =>
			element.path.some((pathPart) => pathPart.name.includes('Scroll & Zoom'))
		);

		if (scrollAndZoomButton === undefined) {
			throw new Error('"Scroll & Zoom" button not found.');
		}

		await clickElement(context, scrollAndZoomButton);
		const scrollDirectionNaturalCheckbox = await pWaitFor(
			async () => {
				const elements = await getElements(context, 'System Preferences');
				const scrollDirectionNaturalCheckbox = elements.find((element) =>
					element.path.some(
						(part) => part.type === 'checkbox' && part.name === '1'
					)
				);
				return [
					scrollDirectionNaturalCheckbox !== undefined,
					scrollDirectionNaturalCheckbox!,
				];
			}
		);

		await toggleCheckbox(context, {
			element: scrollDirectionNaturalCheckbox,
			value: props?.value ?? true,
		});
	},
});

export default scrollDirectionBootstrapper;
