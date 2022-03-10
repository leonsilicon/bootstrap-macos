import inquirer from 'inquirer';
import PressToContinue from 'inquirer-press-to-continue';

inquirer.registerPrompt('press-to-continue', PressToContinue);
