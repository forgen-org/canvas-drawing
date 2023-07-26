/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  runner: '@kayahr/jest-electron-runner',
  testEnvironment: '@kayahr/jest-electron-runner/environment',
  testEnvironmentOptions: {
    electron: {
      disableHardwareAcceleration: true,
    },
  },
  preset: 'ts-jest',
  roots: ['./src'],
}
