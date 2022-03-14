import { createBootstrapper } from '~/utils/bootstrapper.js';

export const luaBootstrapper = createBootstrapper({
	name: 'Lua',
	todo: true,
	bootstrap() {
		// todo: install lua & luarocks and maybe a lua linter
	},
});

export default luaBootstrapper;
