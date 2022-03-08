import * as path from 'node:path';
import * as fs from 'node:fs';
import { camelCase } from 'change-case';
import { runAppleScript } from 'run-applescript';
import { outdent } from 'outdent';
import camelcaseKeys from 'camelcase-keys';
import { getGeneratedPath } from '~/utils/paths.js';

// from https://apple.stackexchange.com/a/227024
const panesListString = await runAppleScript(outdent`
  tell application "System Preferences"
      get the id of every pane
  end tell
`);
const paneIds = panesListString.split(', ');

const panes: Record<string, string> = {};
const paneAnchors: Record<string, Record<string, string>> = {};

await Promise.all(
	paneIds.map(async (paneId) => {
		const anchorsListString = await runAppleScript(outdent`
			tell application "System Preferences"
				get every anchor of pane id ${JSON.stringify(paneId)}
			end tell
		`);

		const anchors = anchorsListString.split(',').map((anchorString) => {
			const anchorNameMatches = /anchor (.+?) of pane id com\.apple/.exec(
				anchorString.trim()
			);

			if (anchorNameMatches === null) {
				throw new Error(
					`Anchor name not found for anchor string ${anchorString}`
				);
			}

			return anchorNameMatches[1]!;
		});

		const paneName = paneId.split('.').at(-1)!;
		panes[paneName] = paneId;
		paneAnchors[paneId] = Object.fromEntries(
			anchors.map((anchor) => [anchor, anchor])
		);
	})
);

const generatedSystemPreferences = path.join(
	getGeneratedPath(),
	'system-preferences.ts'
);

fs.writeFileSync(
	generatedSystemPreferences,
	outdent`
		export const SPPanes = ${JSON.stringify(panes)} as const;

		export const SPPaneAnchors = ${JSON.stringify(paneAnchors)} as const;
	`
);
