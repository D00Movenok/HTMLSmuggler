// Obfuscator doc:
// https://github.com/javascript-obfuscator/javascript-obfuscator#javascript-obfuscator-options
module.exports = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 1,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 1,
  // NOTE: disable debugProtection for testing in console
  debugProtection: true,
  debugProtectionInterval: 4000,
  disableConsoleOutput: true,
  // NOTE: add domains to work only specified domains
  // e.g. example.com, sub.example.com
  domainLock: [],
  domainLockRedirectUrl: "about:blank",
  forceTransformStrings: [],
  identifierNamesCache: null,
  identifierNamesGenerator: "mangled-shuffled",
  identifiersDictionary: [],
  identifiersPrefix: "",
  ignoreImports: false,
  inputFileName: "",
  log: true,
  numbersToExpressions: true,
  renameGlobals: false,
  renameProperties: true,
  renamePropertiesMode: "safe",
  reservedNames: [],
  reservedStrings: [],
  seed: 0,
  selfDefending: true,
  simplify: true,
  sourceMap: false,
  sourceMapBaseUrl: "",
  sourceMapFileName: "",
  sourceMapMode: "separate",
  sourceMapSourcesMode: "sources-content",
  // NOTE: disable splitStrings if "Maximum call stack size exceeded"
  splitStrings: true,
  splitStringsChunkLength: 35,
  stringArray: true,
  stringArrayCallsTransform: true,
  stringArrayCallsTransformThreshold: 1,
  stringArrayEncoding: ["base64", "rc4"],
  stringArrayIndexesType: ["hexadecimal-number"],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 6,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 6,
  stringArrayWrappersType: "function",
  stringArrayThreshold: 1,
  target: "browser",
  transformObjectKeys: true,
  unicodeEscapeSequence: false,
};
