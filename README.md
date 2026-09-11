# SVG Flags

A comprehensive collection of SVG country flags for React web apps and React Native / Expo. High-quality, scalable flag icons with embedded SVG content for instant loading.

## Features

- 🚩 **224 Country Flags**: Complete collection of world flags in SVG format
- ⚡ **Lightweight**: Optimized SVG files for fast loading
- 🎨 **Customizable**: Easy to style and resize
- ♿ **Accessible**: Built with accessibility in mind
- 🔍 **Searchable**: Includes country search functionality
- 📱 **Responsive**: Works great on all devices
- 🎯 **TypeScript**: Full TypeScript support with type definitions
- ⚛️ **React 19**: Compatible with React 19 and all modern React versions

## Installation

```bash
npm install svg-flags
# or
yarn add svg-flags
# or
pnpm add svg-flags
```

## ⚡ Instant Loading (No Setup Required!)

The package now includes **embedded SVG content** for instant loading. No setup required!

- 🚀 **Zero HTTP requests** - All flags load instantly
- 📦 **No file copying** - Everything is included in the package
- ⚡ **Perfect for tables** - 100+ flags load in milliseconds
- 🎯 **No 404 errors** - All flags are guaranteed to work

## Legacy Setup (Optional)

If you prefer the old approach with external files:

```bash
# Run this command in your project root
npx svg-flags setup-flags
```

This will copy all 224 flag SVG files to your project's `public/flags/` directory.

## React Native / Expo

Expo and React Native apps do **not** need `react-dom`. It is an optional peer (`peerDependenciesMeta`), so install works without `--legacy-peer-deps`.

### Install (Expo)

```bash
npx expo install react-native-svg
npm install svg-flags@^1.1.0
```

### Install (React Native CLI)

```bash
npm install svg-flags@^1.1.0 react-native-svg
# then follow react-native-svg's linking docs for your RN version
```

Metro resolves the native entry (`dist/index.native.js`) automatically via the package `"react-native"` / `exports` field.

### Use the native `<Flag />`

```tsx
import { Flag } from "svg-flags";
import { View } from "react-native";

export function CountryBadge() {
  return (
    <View>
      <Flag country="us" width={32} />
      <Flag country="gr" width={48} showBorder />
      <Flag
        country="de"
        width={40}
        clickable
        onClick={(code) => console.log(code)}
      />
    </View>
  );
}
```

### Alternative: `getEmbeddedFlag` + `SvgXml`

If you prefer not to use the React component (or want full control over layout):

```tsx
import { getEmbeddedFlag } from "svg-flags";
import { SvgXml } from "react-native-svg";

export function UsFlag() {
  const xml = getEmbeddedFlag("us");
  if (!xml) return null;
  return <SvgXml xml={xml} width={32} height={21} />;
}
```

`getEmbeddedFlag` returns the raw SVG string and does not require React.

### Web-only: `FlagSelector`

`FlagSelector` uses DOM inputs and is **web-only**. On React Native / Expo, use `<Flag />` or `getEmbeddedFlag` + `SvgXml` instead.

## Quick Start

```tsx
import { Flag } from "svg-flags";

function App() {
  return (
    <div>
      <Flag country="us" width={32} />
      <Flag country="gb" width={48} height={32} />
      <Flag country="fr" width={64} showBorder />

      {/* Custom fallback for invalid country codes */}
      <Flag country="invalid" fallback="🏳️" />
      <Flag country="unknown" fallback="❓" />
    </div>
  );
}
```

## Components

### Flag

The main component for displaying country flags.

```tsx
import { Flag } from "svg-flags";

<Flag
  country="us" // Country code (required)
  width={32} // Width in pixels (default: 32)
  height={24} // Height in pixels (optional)
  className="my-flag" // CSS class name
  style={{ margin: 8 }} // Inline styles
  alt="US Flag" // Alt text for accessibility
  clickable={true} // Make flag clickable
  onClick={(country) => console.log(country)}
  showBorder={true} // Show border around flag
  borderColor="#ccc" // Border color
  borderWidth={1} // Border width
  fallback="🏳️" // Custom fallback for invalid country codes
/>;
```

### FlagSelector

A dropdown component for selecting countries with search functionality.

```tsx
import { FlagSelector } from "svg-flags";

function CountrySelector() {
  const [selectedCountry, setSelectedCountry] = useState("us");

  return (
    <FlagSelector
      value={selectedCountry}
      onChange={setSelectedCountry}
      placeholder="Search countries..."
      flagSize={24}
      showNames={true}
      showSearch={true}
      maxResults={50}
    />
  );
}
```

## API Reference

### Flag Props

| Prop          | Type                        | Default     | Description                                                    |
| ------------- | --------------------------- | ----------- | -------------------------------------------------------------- |
| `country`     | `string`                    | -           | Country code (e.g., 'us', 'gb', 'fr')                          |
| `width`       | `number`                    | `32`        | Width of the flag in pixels                                    |
| `height`      | `number`                    | -           | Height of the flag in pixels (auto-calculated if not provided) |
| `className`   | `string`                    | `''`        | CSS class name for styling                                     |
| `style`       | `React.CSSProperties`       | `{}`        | Additional CSS styles                                          |
| `alt`         | `string`                    | -           | Alt text for accessibility                                     |
| `clickable`   | `boolean`                   | `false`     | Whether the flag should be clickable                           |
| `onClick`     | `(country: string) => void` | -           | Click handler function                                         |
| `showBorder`  | `boolean`                   | `false`     | Whether to show a border around the flag                       |
| `borderColor` | `string`                    | `'#e5e7eb'` | Border color                                                   |
| `borderWidth` | `number`                    | `1`         | Border width                                                   |
| `fallback`    | `string`                    | `'🌍'`      | Custom fallback content when country code is invalid           |

### FlagSelector Props

| Prop          | Type                                | Default                 | Description                            |
| ------------- | ----------------------------------- | ----------------------- | -------------------------------------- |
| `value`       | `string`                            | -                       | Currently selected country code        |
| `onChange`    | `(country: string) => void`         | -                       | Callback when country is selected      |
| `placeholder` | `string`                            | `'Search countries...'` | Placeholder text for search input      |
| `disabled`    | `boolean`                           | `false`                 | Whether the selector is disabled       |
| `className`   | `string`                            | `''`                    | CSS class name                         |
| `style`       | `React.CSSProperties`               | `{}`                    | Additional styles                      |
| `flagSize`    | `number`                            | `24`                    | Flag size in pixels                    |
| `showNames`   | `boolean`                           | `true`                  | Whether to show country names          |
| `showSearch`  | `boolean`                           | `true`                  | Whether to show search input           |
| `maxResults`  | `number`                            | `50`                    | Maximum number of countries to display |
| `filter`      | `(country: CountryInfo) => boolean` | -                       | Custom filter function                 |

## Utilities

The package also exports utility functions for working with flags:

```tsx
import {
  normalizeCountryCode,
  isValidCountryCode,
  getCountryInfo,
  searchCountries,
  getAvailableCountryCodes,
} from "svg-flags";

// Normalize country code
const code = normalizeCountryCode("US"); // 'us'

// Validate country code
const isValid = isValidCountryCode("us"); // true

// Get country information
const info = getCountryInfo("us");
// { code: 'us', name: 'United States', ... }

// Search countries
const results = searchCountries("united");
// Returns array of countries matching the search

// Get all available country codes
const codes = getAvailableCountryCodes();
// ['us', 'gb', 'fr', ...]
```

## Available Countries

The package includes flags for 224 countries and territories:

- **North America**: US, CA, MX, and more
- **Europe**: GB, FR, DE, IT, ES, and more
- **Asia**: CN, JP, KR, IN, and more
- **Africa**: ZA, EG, NG, and more
- **South America**: BR, AR, CL, and more
- **Oceania**: AU, NZ, and more

## Styling

Flags can be styled using CSS classes or inline styles:

```tsx
// Using CSS classes
<Flag country="us" className="my-flag" />

// Using inline styles
<Flag
  country="us"
  style={{
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }}
/>
```

## Accessibility

The package includes built-in accessibility features:

- ARIA labels for screen readers
- Keyboard navigation support
- High contrast support
- Alt text for images

## Performance

- SVG files are optimized for size
- Lazy loading support
- Efficient rendering with React
- Minimal bundle size impact

## React Compatibility

This package works with:

- **React 19** ✅
- **React 18** ✅
- **React 17** ✅
- **React 16.8+** ✅ (hooks)
- **React Native / Expo** ✅ (`react-native-svg`; `react-dom` optional)

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Troubleshooting

### Flags Not Loading (404 Errors)

If you see 404 errors in the browser console when trying to load flags, make sure you've run the setup command:

```bash
npx svg-flags setup-flags
```

This copies the SVG files to your project's `public/flags/` directory.

### Manual Setup

If the automatic setup doesn't work, manually copy the flag files:

1. Find the `flags` directory in `node_modules/svg-flags/`
2. Copy all `.svg` files to your project's `public/flags/` directory
3. Ensure your web server serves static files from the public directory

### Next.js Projects

For Next.js projects, make sure your `next.config.js` includes:

```js
module.exports = {
  // ... other config
  async rewrites() {
    return [
      {
        source: "/flags/:path*",
        destination: "/flags/:path*",
      },
    ];
  },
};
```

### Vite Projects

For Vite projects, the files should be accessible automatically if placed in the `public` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Changelog

### 1.0.0

- Initial release
- 224 country flags
- React components
- TypeScript support
- Search functionality
- Accessibility features

## Releasing

Versions are published automatically by [semantic-release](https://github.com/semantic-release/semantic-release) when commits land on `main`.

**Commit / PR titles** (squash-merge so the PR title becomes the release commit):

- `fix:` or `perf:` — patch (`1.0.5` → `1.0.6`)
- `feat:` — minor (`1.0.5` → `1.1.0`)
- `feat!:` / `fix!:` or a `BREAKING CHANGE:` footer — major (`1.0.5` → `2.0.0`)
- `chore:`, `docs:`, `ci:`, `test:` — no npm publish

**One-time npm setup** (package owner):

1. On [npmjs.com/package/svg-flags](https://www.npmjs.com/package/svg-flags) open **Settings → Trusted Publisher**.
2. Add GitHub Actions: owner `pountzas`, repository `SVG-flags`, workflow `release.yml`, environment `npm`.
3. After the first successful trusted publish, delete the GitHub secret `NPM_TOKEN` if it still exists.
4. In the GitHub repo, prefer **squash merging** pull requests.
