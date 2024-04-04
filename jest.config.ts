import { type JestConfigWithTsJest } from 'ts-jest';
import { defaults as tsjPreset } from 'ts-jest/presets';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  roots: ['<rootDir>'],
  transform: {
    ...tsjPreset.transform,
  },
  testMatch: ['<rootDir>/src/**/*.test.ts?(x)'],
  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@/(.+)': '<rootDir>/src/$1',
    '^@test/(.+)': '<rootDir>/test/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>'],
};

export default jestConfig;
