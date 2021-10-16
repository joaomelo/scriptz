import { colors } from './colors.js';

const firebaseEmulators = {
  command: 'firebase emulators:start',
  label: 'emulators',
  textColor: colors.textWhite,
  bgColor: colors.bgYellow
};

const webServerBase = {
  command: 'webpack serve --config webpack.config.js',
  useNpx: true,
  envFile: '.env',
  textColor: colors.textWhite,
  bgColor: colors.bgCyan
};

const webServerLocal = {
  label: 'serve',
  ...webServerBase
};

export const servicesLocal = {
  compose: [firebaseEmulators, webServerLocal],
  mode: 'parallel'
};

const webServerLocalFixtures = {
  envVars: { APP_ENV_LOAD_FIXTURES: 'yes' },
  label: 'serve-fix',
  ...webServerBase
};

export const servicesLocalFixtures = {
  compose: [firebaseEmulators, webServerLocalFixtures],
  mode: 'parallel'
};
