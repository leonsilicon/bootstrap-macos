import { createBootstrapper } from '~/utils/bootstrapper.js';

export const swiftBootstrapper = createBootstrapper({
	name: 'Heroku',
	todo: true,
	bootstrap() {
		// Mint is a swift formatter
		await brewInstall('mint');
		// https://stackoverflow.com/questions/61501298/xcrun-error-unable-to-find-utility-xctest-not-a-developer-tool-or-in-path
		// mint install apple/swift-format@swift-5.3-branch
		// install apple-swift-format vscode extension
		// /Users/leonzalion/.mint/bin
	},
});

export default swiftBootstrapper;
