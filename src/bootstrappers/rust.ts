import { createBootstrapper } from '~/utils/bootstrapper.js';
import { commandExists, runCommand } from '~/utils/command.js';

export const rustBootstrapper = createBootstrapper({
	async skip() {
		return commandExists('rustup');
	},
	async bootstrap() {
		/**
		Using rustup allows for multiple versions:
		https://users.rust-lang.org/t/best-way-to-install-rust-on-os-x-rustup-or-brew/6362
		*/
		await runCommand({
			description: 'Installing Rust using rustup',
			link: 'https://www.rust-lang.org/tools/install',
			command: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",
			shell: true,
		});
	},
});
