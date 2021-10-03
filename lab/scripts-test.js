import { colors } from './colors.js';
import { servicesLocal } from './scripts-services.js';

const waitThen = {
  command: 'wait-on http://localhost:8181',
  label: 'wait8181',
  useNpx: true,
  textColor: colors.textMagenta,
  bgColor: colors.bgBlack
};

const runnerLocal = {
  command: 'jest --forceExit --detectOpenHandles --setupTestFrameworkScriptFile=./tests/config/setup.js --coverage=false',
  label: 'runner',
  textColor: colors.textWhite,
  bgColor: colors.bgGreen,
  useNpx: true,
  envFile: '.env'
};

const waitThenRunnerLocal = {
  compose: [waitThen, runnerLocal],
  mode: 'serial'
};

export const testLocal = {
  compose: [servicesLocal, waitThenRunnerLocal],
  mode: 'race'
};
