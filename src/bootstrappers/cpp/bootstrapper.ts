import { createBootstrapper } from '~/utils/bootstrapper.js';
import * as fs from 'node:fs';
import { got } from 'got';

export const cppBootstrapper = createBootstrapper({
	name: 'C++',
	async bootstrap(context) {
		// https://apple.stackexchange.com/a/270812
		const bitsStdCpp = await got.get("https://raw.githubusercontent.com/gcc-mirror/gcc/master/libstdc%2B%2B-v3/include/precompiled/stdc%2B%2B.h");
		if (!context.dryRun) {
			fs.writeFileSync("/usr/local/include/stdc++.h", bitsStdCpp.body);
		}
	},
});

export default cppBootstrapper;
