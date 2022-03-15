import * as path from 'node:path';
import * as fs from 'node:fs';
import appExists from 'app-exists';
import { outdent } from 'outdent';
import { createBootstrapper } from '~/utils/bootstrapper.js';
import { brewInstall } from '~/utils/brew.js';
import { getDotConfigDir } from '~/utils/config.js';
import { sendMessage } from '~/utils/message.js';
import { giveAppPermissionAccess } from '~/utils/system-preferences.js';

const alacrittyConfig = outdent`
  # Colors (Gruvbox light)
  colors:
    # Default colors
    primary:
      # hard contrast: background = '#f9f5d7'
      background: '#282828'
      # soft contrast: background = '#f2e5bc'
      foreground: '#83a598'

    # Normal colors
    normal:
      black:   '#1d2021'
      red:     '#cc241d'
      green:   '#98971a'
      yellow:  '#d79921'
      blue:    '#458588'
      magenta: '#b16286'
      cyan:    '#689d6a'
      white:   '#a89984'

    # Bright colors
    bright:
      black:   '#282828'
      red:     '#fb4934'
      green:   '#b8bb26'
      yellow:  '#fabd2f'
      blue:    '#83a598'
      magenta: '#d3869b'
      cyan:    '#8ec07c'
      white:   '#fbf1c7'
  font:
    size: 20
`;

export const alacrittyBootstrapper = createBootstrapper({
	name: 'Alacritty',
	description: 'A cross-platform, OpenGL terminal emulator.',
	async skip() {
		return appExists('Alacritty');
	},
	async bootstrap(context) {
		await brewInstall(context, 'alacritty', { cask: true });

		await sendMessage(context, 'Setting up Alacritty configuration...');
		if (!context.dryRun) {
			const alacrittyConfigPath = path.join(
				await getDotConfigDir(),
				'alacritty.yml'
			);
			if (!fs.existsSync(alacrittyConfigPath)) {
				await fs.promises.writeFile(alacrittyConfigPath, alacrittyConfig);
			}
		}

		await giveAppPermissionAccess(context, {
			appName: 'Alacritty',
			permissionName: 'Accessibility',
		});
	},
});

export default alacrittyBootstrapper;
