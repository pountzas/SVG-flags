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

const nativeEsm = path.join(__dirname, '../dist/index.native.esm.js');
const nativeBundles = [nativeEntry, nativeEsm].filter((p) => fs.existsSync(p));
const webBundles = [
  path.join(__dirname, '../dist/index.js'),
  path.join(__dirname, '../dist/index.esm.js'),
].filter((p) => fs.existsSync(p));

for (const bundlePath of [...webBundles, ...nativeBundles]) {
  const source = fs.readFileSync(bundlePath, 'utf8');
  if (source.includes('svg?raw') || /import\s*\(\s*`[^`]*\$\{/.test(source)) {
    console.error(`❌ ${path.basename(bundlePath)} still contains bundler-breaking dynamic SVG import`);
    process.exit(1);
  }
}
console.log('✅ Web + native bundles have no dynamic .svg?raw imports (Metro / Next / Vite safe)');

const exportsField = pkg.exports && pkg.exports['.'];
if (!exportsField || !exportsField['react-native'] || !exportsField.import || !exportsField.require) {
  console.error('❌ package.json exports must cover react-native, import, and require');
  process.exit(1);
}
console.log('✅ package.json exports cover React Native + web (React / Next.js)');

const { loadSvgContent } = require('../dist/index.js');
loadSvgContent('gr').then((svg) => {
  if (!svg || !svg.includes('<svg')) {
    console.error('❌ loadSvgContent("gr") failed');
    process.exit(1);
  }
  console.log(`✅ loadSvgContent('gr') returned ${svg.length} chars`);
  console.log('\n🎉 All tests passed!');
}).catch((err) => {
  console.error('❌ loadSvgContent failed', err);
  process.exit(1);
});
