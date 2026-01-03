# Quick Start Guide - Aurum Launcher

Get up and running with the Aurum Launcher in 5 minutes!

## For Developers

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Mode
```bash
npm run dev
```

This starts both the Next.js dev server and Electron app. The launcher window will open automatically.

### 3. Test Admin Features
1. In the launcher window, click "Admin Login"
2. Enter:
   - Email: `semvanhunsel@gmail.com`
   - Password: `58143663`
3. Click "Add Game" to add your first game
4. Generate unlock codes for the game

### 4. Test User Features
1. Click "Exit Admin" to return to user view
2. Enter the unlock code you generated
3. Click "Redeem"
4. Your unlocked game appears in "My Games"
5. Click "PLAY" to launch it

## For End Users

### Installing
1. Download `Aurum Launcher Setup.exe`
2. Run the installer
3. Launch from desktop or Start menu

### Using
1. Get an unlock code from Aurum Studios
2. Enter it in the launcher
3. Click "Redeem"
4. Play your game!

## Building for Distribution

### Create Windows .exe
```bash
npm run build:electron
```

The installer will be in `dist/Aurum Launcher Setup 1.0.0.exe`

## Key Features

✅ Futuristic dark UI with glowing effects
✅ Admin panel for game management
✅ Unique unlock code system
✅ SQLite database for local storage
✅ Game library and storefront
✅ Windows .exe packaging

## Project Structure

```
aurum-launcher/
├── electron/           # Electron main process
│   ├── main.js        # App entry point
│   └── preload.js     # IPC bridge
├── app/               # Next.js frontend
│   ├── page.tsx       # Main UI
│   └── globals.css    # Styles
├── types/             # TypeScript types
└── out/               # Built static site
```

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development mode |
| `npm run build` | Build Next.js app |
| `npm run build:electron` | Build Windows .exe |
| `npm run lint` | Run ESLint |

## Admin Credentials

**Email**: semvanhunsel@gmail.com  
**Password**: 58143663

## Tech Stack

- **Electron** - Desktop app framework
- **Next.js** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **SQLite** - Local database

## Need Help?

- 📖 Read the full [README.md](./README.md)
- 📚 Check the [User Guide](./USER_GUIDE.md)
- 🔧 See [Building Guide](./BUILDING.md)

## Demo Workflow

### Admin Workflow
1. Login → Add Game → Generate Code → Share Code

### User Workflow
1. Enter Code → Redeem → Play Game

That's it! You're ready to use Aurum Launcher! 🎮
