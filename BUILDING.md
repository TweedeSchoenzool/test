# Building Aurum Launcher for Windows

This guide explains how to build the Aurum Launcher as a Windows .exe executable.

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- Windows 10/11 (for testing the .exe)

## Installation

1. Clone or download the project
2. Install dependencies:

```bash
npm install
```

## Development Mode

To run the launcher in development mode (with hot reload):

```bash
npm run dev
```

This will:
- Start Next.js dev server on port 3000
- Launch Electron window automatically
- Enable hot reloading for both frontend and Electron
- Open DevTools for debugging

## Building for Production

### Step 1: Build Next.js App

```bash
npm run build
```

This creates an optimized static export in the `out/` directory.

### Step 2: Build Windows Executable

```bash
npm run build:electron
```

This will:
1. Build the Next.js app
2. Package everything with Electron
3. Create a Windows installer (.exe) in the `dist/` directory

The installer will be named something like:
- `Aurum Launcher Setup 1.0.0.exe`

## Build Output

After running `npm run build:electron`, you'll find:

```
dist/
├── win-unpacked/              # Unpacked application files
├── Aurum Launcher Setup 1.0.0.exe  # Windows installer
└── builder-effective-config.yaml    # Build configuration
```

## Distribution

To distribute the launcher:

1. Locate the installer: `dist/Aurum Launcher Setup 1.0.0.exe`
2. Share this .exe file with users
3. Users can double-click to install
4. The launcher will be installed to their Program Files and desktop

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Clear caches:
```bash
rm -rf node_modules .next out dist
npm install
```

2. Rebuild:
```bash
npm run build
npm run build:electron
```

### SQLite Errors

If you see better-sqlite3 errors:
```bash
npm rebuild better-sqlite3
```

### Missing Dependencies

Make sure all dependencies are installed:
```bash
npm install
```

## Build Customization

To customize the build, edit `package.json` under the `"build"` section:

```json
"build": {
  "appId": "com.aurumstudios.launcher",
  "productName": "Aurum Launcher",
  "win": {
    "target": ["nsis"]
  }
}
```

Available options:
- Change app ID
- Change product name
- Add custom icon
- Configure installer behavior
- Add code signing

## Testing the Build

Before distributing:

1. Build the app:
```bash
npm run build:electron
```

2. Install the .exe on a test machine

3. Test all features:
   - Admin login
   - Adding games
   - Generating codes
   - Redeeming codes
   - Launching games
   - Database persistence

## File Structure for Build

```
aurum-launcher/
├── electron/
│   ├── main.js          # Electron main process
│   └── preload.js       # Preload script for IPC
├── app/
│   ├── page.tsx         # Main UI component
│   ├── layout.tsx       # App layout
│   └── globals.css      # Global styles
├── types/
│   └── electron.d.ts    # TypeScript definitions
├── out/                 # Built Next.js app (static)
├── dist/                # Built Electron app (.exe)
└── package.json         # Dependencies and build config
```

## Database Location

When installed, the database is stored at:
- `%APPDATA%/aurum-launcher/aurum-launcher.db`

This ensures data persists between app updates.

## Next Steps

After building:

1. Test the installer on a clean Windows machine
2. Verify all features work correctly
3. Check database persistence
4. Test admin login with the provided credentials
5. Distribute to end users

## Support

For issues or questions:
- Check the main README.md
- Review error logs in DevTools (Ctrl+Shift+I in development)
- Check the Electron builder documentation
