# Aurum Studios Game Launcher

A futuristic Windows .exe game launcher/storefront application built with Electron and Next.js.

## Features

### User Features
- Browse available games in the storefront
- Redeem unlock codes to gain access to games
- View and launch owned games
- Sleek, futuristic dark-themed UI

### Admin Features
- Secure admin login panel
  - Email: `semvanhunsel@gmail.com`
  - Password: `58143663`
- Add new games with title, description, image, and price
- Generate unique unlock codes for games
- View all unlock codes and their status (used/available)
- Delete or disable games from the library

## Tech Stack

- **Electron**: Desktop application framework
- **Next.js**: React-based frontend
- **React**: UI components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Styling
- **SQLite (better-sqlite3)**: Local database for games, codes, and user data

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start the development server (Next.js + Electron)
npm run dev
```

This will:
1. Start the Next.js development server on http://localhost:3000
2. Launch the Electron app window

## Building for Production

```bash
# Build Next.js app
npm run build

# Build Electron app for Windows
npm run build:electron
```

This will create a Windows .exe installer in the `dist/` directory.

## Usage

### For Users

1. Launch the Aurum Launcher application
2. Browse available games in the storefront
3. Enter an unlock code in the input field at the top
4. Click "Redeem" to unlock the game
5. Unlocked games appear in "My Games" section
6. Click "PLAY" to launch a game

### For Admins

1. Click "Admin Login" button in the top right
2. Enter admin credentials:
   - Email: `semvanhunsel@gmail.com`
   - Password: `58143663`
3. Once logged in, you can:
   - Click "Add Game" to add new games
   - Click "Generate Code" on any game card to create unlock codes
   - Click "View Codes" to see all generated codes and their status
   - Click "Delete" to remove a game from the library
   - Click "Exit Admin" to return to user view

## Data Storage

All data is stored locally in an SQLite database located at:
- Windows: `%APPDATA%/aurum-launcher/aurum-launcher.db`

The database includes:
- **games**: Game information (title, description, image, price)
- **unlock_codes**: Generated unlock codes and their status
- **user_unlocks**: Track which games the user has unlocked

## Design

The launcher features a futuristic aesthetic with:
- Dark theme with purple and cyan accents
- Glowing effects and smooth animations
- Clean, modern card-based layout
- Professional gaming platform look and feel
- Responsive grid layout for game cards

## Future Enhancements

- Actual game launching integration (currently placeholder)
- Multiple user profiles
- Game installation/update management
- Achievement system
- Social features
- Cloud sync for game progress
- Payment integration
