const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Next.jsアプリのルートディレクトリを指定
  dir: "./",
});

// Jest設定をカスタマイズ
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/tests/unit/sample.spec.js",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
  ],
};

// createJestConfigは非同期関数なので、next/jestが非同期でNext.js設定を読み込めるようにします
module.exports = createJestConfig(customJestConfig);
