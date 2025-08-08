module.exports = {
  moduleNameMapper: {
      '@app/(.*)': '<rootDir>/src/app/$1',
      '@env': '<rootDir>/src/environments/environment',
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  collectCoverage: true
};