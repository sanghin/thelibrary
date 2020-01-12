module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  preset: 'ts-jest/presets/js-with-babel',
  testMatch: ['<rootDir>/tests/**/*.js', '<rootDir>/tests/**/*.ts', '<rootDir>/tests/**/*.tsx'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/tests/test-data/',
    '<rootDir>/tests/common/',
  ],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    'Actions/(.*)': '<rootDir>/actions/$1',
    'Components/(.*)': '<rootDir>/components/$1',
    'TestData/(.*)': '<rootDir>/tests/test-data/$1',
    'Test/(.*)': '<rootDir>/tests/$1',
  },
  collectCoverageFrom: [
    '<rootDir>/pages/**/*.js',
    '<rootDir>/components/**/*.js',
    '<rootDir>/server/**/*.js',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
};
