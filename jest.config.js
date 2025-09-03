process.env.TZ = "UTC";
module.exports = {
    rootDir: ".",
    moduleFileExtensions: ["tsx", "ts", "js"],
    coverageDirectory: "<rootDir>/tests/coverage",
    testEnvironment: "jsdom",
    testMatch: ["<rootDir>/tests/**/*.spec.[jt]s?(x)"],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/src/__mocks__/fileMock.js",
    },
    moduleDirectories: ["node_modules", "<rootDir>"],
    setupFilesAfterEnv: ["<rootDir>/tests/setup/global-setup.ts"],
    reporters: ["default", ["jest-junit", { outputName: "junit.xml" }]],
};
