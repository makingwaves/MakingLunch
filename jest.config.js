module.exports = {
    'preset': 'react-native',
    'moduleFileExtensions': [
        'ts',
        'tsx',
        'js'
    ],
    'moduleNameMapper': {
        '^@app(.*)$': '<rootDir>/app$1'
    },
    'transform': {
        '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
        '\\.(ts|tsx)$': 'ts-jest'
    },
    'testRegex': '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    'testPathIgnorePatterns': [
        '\\.snap$',
        '<rootDir>/node_modules/'
    ],
    'cacheDirectory': '.jest/cache',
}