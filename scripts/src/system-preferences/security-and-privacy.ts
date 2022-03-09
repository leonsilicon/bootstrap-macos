import { runAppleScript } from 'run-applescript';
import { outdent } from 'outdent';

const output = await runAppleScript(outdent`
  tell application "System Events"
    tell front window of process "System Preferences"
      get entire contents
    end tell
  end tell
`);

const uiElements = output.split(', ');

console.log(uiElements)