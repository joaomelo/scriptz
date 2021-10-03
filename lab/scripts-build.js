import { colors } from './colors.js';

const clean = {
  command: 'rimraf dist/*',
  label: 'clean-dist',
  useNpx: true,
  textColor: colors.textWhite,
  bgColor: colors.bgBlack
};

const bundleBase = {
  command: 'webpack --config webpack.config.js --env prod --env varsNullify=EMULATOR',
  useNpx: true,
  textColor: colors.textMagenta,
  bgColor: colors.bgWhite
};

const bundleLocal = {
  label: 'build-local',
  envFile: '.env',
  ...bundleBase
};

export const buildLocal = {
  compose: [clean, bundleLocal],
  mode: 'serial'
};

const bundleCi = {
  label: 'build-ci',
  ...bundleBase
};

export const buildCi = {
  compose: [clean, bundleCi],
  mode: 'serial'
};
