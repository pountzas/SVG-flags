const pkg = require('../package.json');
const {
  Flag,
  FlagSelector,
  AVAILABLE_COUNTRIES,
  normalizeCountryCode,
  isValidCountryCode,
  getCountryInfo,
  getEmbeddedFlag,
  getEmbeddedCountryCodes,
} = require('../dist/index.js');

console.log('✅ Package loaded successfully');
console.log(`📊 Available countries: ${AVAILABLE_COUNTRIES.length}`);
console.log(`🌍 First country: ${AVAILABLE_COUNTRIES[0]}`);
console.log(`🌍 Last country: ${AVAILABLE_COUNTRIES[AVAILABLE_COUNTRIES.length - 1]}`);

console.log('\n🧪 Testing utility functions:');
console.log(`normalizeCountryCode('US'): ${normalizeCountryCode('US')}`);
console.log(`isValidCountryCode('us'): ${isValidCountryCode('us')}`);
console.log(`isValidCountryCode('invalid'): ${isValidCountryCode('invalid')}`);
console.log(`getCountryInfo('us'):`, getCountryInfo('us'));

const usFlag = getEmbeddedFlag('us');
if (!usFlag || !usFlag.includes('<svg')) {
  console.error('❌ getEmbeddedFlag("us") failed');
  process.exit(1);
}
console.log(`✅ getEmbeddedFlag('us') returned ${usFlag.length} chars`);
console.log(`✅ Embedded country codes: ${getEmbeddedCountryCodes().length}`);

if (typeof Flag !== 'function' && typeof Flag !== 'object') {
  console.error('❌ Flag export missing');
  process.exit(1);
}
if (typeof FlagSelector !== 'function' && typeof FlagSelector !== 'object') {
  console.error('❌ FlagSelector export missing');
  process.exit(1);
}
console.log('✅ Flag and FlagSelector exports present');

const peerMeta = pkg.peerDependenciesMeta || {};
if (!peerMeta['react-dom'] || peerMeta['react-dom'].optional !== true) {
  console.error('❌ peerDependenciesMeta.react-dom.optional must be true');
  process.exit(1);
}
if (!peerMeta['react-native-svg'] || peerMeta['react-native-svg'].optional !== true) {
  console.error('❌ peerDependenciesMeta.react-native-svg.optional must be true');
  process.exit(1);
}
console.log('✅ Optional peers: react-dom, react-native-svg');

const fs = require('fs');
const path = require('path');
const nativeEntry = path.join(__dirname, '../dist/index.native.js');
if (!fs.existsSync(nativeEntry)) {
  console.error('❌ dist/index.native.js missing (React Native entry)');
  process.exit(1);
}
console.log('✅ dist/index.native.js present');

if (pkg['react-native'] !== 'dist/index.native.js') {
  console.error('❌ package.json react-native field should point at dist/index.native.js');
  process.exit(1);
}
console.log('✅ package.json react-native field OK');

console.log('\n🎉 All tests passed!');
