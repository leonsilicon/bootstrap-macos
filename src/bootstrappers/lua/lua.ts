import { createBootstrapper } from '~/utils/bootstrapper.js';

export const luaBootstrapper = createBootstrapper({
	name: 'Lua',
	bootstrap() {
		// todo: install lua & luarocks and maybe a lua linter
	},
});

export default luaBootstrapper;
