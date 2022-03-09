const path = require('path');

module.exports = {
	extends: [require.resolve('@leonzalion/configs/eslint.cjs')],
	ignorePatterns: ['generated'],
	parserOptions: {
		project: [path.resolve(__dirname, 'tsconfig.eslint.json')],
	},
	rules: {
		'@typescript-eslint/naming-convention': 'off',
	},
};
