# SVG Flags Example

This is a React example application demonstrating the `svg-flags` package.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Running the Example

1. **Navigate to the example directory:**

   ```bash
   cd example
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   The app will automatically open at `http://localhost:3002`

## 📱 What You'll See

The example demonstrates:

- **Basic Flag Display**: Various country flags in different sizes
- **Interactive Flags**: Clickable flags with hover effects
- **Country Selector**: Dropdown with search functionality
- **Different Sizes**: Flags from 16px to 96px
- **Custom Styling**: Flags with borders, shadows, and effects
- **Error Handling**: How the package handles invalid country codes

## 🎯 Current Implementation

The example now uses **actual SVG flag files** from the `flags/` directory:

- **Real flag designs**: Each country displays its authentic flag design
- **224 countries available**: All flags from the original collection
- **No text overlay**: Clean flag display without country codes
- **Responsive sizing**: Flags scale properly at different sizes
- **Fast loading**: SVG files are served from the public directory

### Available Countries

The example includes flags for 224 countries including:

- **US**: United States flag
- **GB**: United Kingdom flag
- **FR**: France flag
- **DE**: Germany flag
- **JP**: Japan flag
- **CA**: Canada flag
- **AU**: Australia flag
- **BR**: Brazil flag
- **IN**: India flag
- **CN**: China flag
- And 214 more countries!

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
example/
├── public/
│   └── flags/          # SVG flag files (224 countries)
├── src/
│   ├── App.tsx          # Main demo component
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript config
└── index.html           # HTML template
```

## 🔧 Configuration

The example is configured to use the local `svg-flags` package:

```typescript
// vite.config.ts
resolve: {
  alias: {
    'svg-flags': path.resolve(__dirname, '../src/index.ts')
  }
}
```

This allows you to test changes to the package in real-time.

## 🎯 Features Demonstrated

- ✅ Flag component with various props
- ✅ Country selector with search
- ✅ Interactive flags with click handlers
- ✅ Custom styling and borders
- ✅ Error handling for invalid codes
- ✅ Responsive design
- ✅ TypeScript support
- ✅ Real SVG flag files

## 🐛 Troubleshooting

If you encounter issues:

1. **Port already in use**: Change the port in `vite.config.ts`
2. **TypeScript errors**: Run `npm run lint` to check for issues
3. **Package not found**: Make sure you're in the `example` directory
4. **Flags not loading**: Check that SVG files are in `public/flags/`

## 📦 Building for Production

```bash
npm run build
```

This creates a production build in the `dist` folder.

## 🎨 Customization

Feel free to modify `src/App.tsx` to test different features:

- Add more countries
- Test different flag sizes
- Try custom styling
- Test the search functionality

## 🔄 How It Works

The Flag component:

1. **Loads SVG files**: Fetches actual SVG files from `/flags/{country}.svg`
2. **Processes content**: Resizes and styles the SVG for display
3. **Handles errors**: Shows fallback for missing or invalid flags
4. **Provides interactivity**: Supports click handlers and hover effects

## 🎉 Success!

The example is now running successfully at `http://localhost:3002` with:

- ✅ React 19 compatibility
- ✅ TypeScript support
- ✅ Hot module replacement
- ✅ Real SVG flag files (224 countries)
- ✅ All interactive features working
- ✅ No text overlays on flags

The example is designed to be a playground for testing the `svg-flags` package!
