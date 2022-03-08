import open from 'open';
import { useBrew } from '~/utils/brew.js';

if (useBrew()) {

}

await open(
	'https://github.com/pqrs-org/Karabiner-Elements/releases/download/v14.4.0/Karabiner-Elements-14.4.0.dmg'
);
