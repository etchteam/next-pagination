const transformOptions = [
  'ts-jest',
  {
    useESM: true,
  },
];

/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^(\\.{1,2}/.*)\\.jsx$': '$1',
  },
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s?$': transformOptions,
    '^.+\\.[tj]sx?$': transformOptions,
  },
};

export default config;
