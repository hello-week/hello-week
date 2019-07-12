module.exports = function(config) {
  config.set({
    frameworks: ['karma-typescript', 'mocha', 'chai'],
    files: [
      { pattern: "src/**/*.ts", include: true }
    ],
    preprocessors: {
      "test/**/*.ts": "karma-typescript"
    },
    plugins: [
      'karma-typescript',
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-chai'
    ],
    reporters: ['progress', 'karma-typescript'],
    karmaTypescriptConfig: {
      compilerOptions: {
        target: "es5",
      },
      exclude: [
        'node_modules',
        '*_test.ts'
      ],
      coverageOptions: {
        exclude: [
          /_test\.ts$/
        ]
      }
    },
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};
