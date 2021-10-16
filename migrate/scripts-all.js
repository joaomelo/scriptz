import * as buildScripts from './scripts-build.js';
import * as serviceScripts from './scripts-services.js';
import * as testScripts from './scripts-test.js';

export const scripts = {
  ...buildScripts,
  ...serviceScripts,
  ...testScripts
};
