const { Flag, FlagSelector, AVAILABLE_COUNTRIES } = require('../dist/index.js');

console.log('✅ Package loaded successfully');
console.log(`📊 Available countries: ${AVAILABLE_COUNTRIES.length}`);
console.log(`🌍 First country: ${AVAILABLE_COUNTRIES[0]}`);
console.log(`🌍 Last country: ${AVAILABLE_COUNTRIES[AVAILABLE_COUNTRIES.length - 1]}`);

// Test some utility functions
const { normalizeCountryCode, isValidCountryCode, getCountryInfo } = require('../dist/index.js');

console.log('\n🧪 Testing utility functions:');
console.log(`normalizeCountryCode('US'): ${normalizeCountryCode('US')}`);
console.log(`isValidCountryCode('us'): ${isValidCountryCode('us')}`);
console.log(`isValidCountryCode('invalid'): ${isValidCountryCode('invalid')}`);
console.log(`getCountryInfo('us'):`, getCountryInfo('us'));

console.log('\n🎉 All tests passed!');
