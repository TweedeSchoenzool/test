# Aurum Launcher User Guide

Welcome to the Aurum Studios Game Launcher! This guide will help you get started with using the launcher.

## Installation

1. Download the `Aurum Launcher Setup.exe` installer
2. Double-click the installer to begin installation
3. Follow the on-screen instructions
4. Launch the Aurum Launcher from your desktop or Start menu

## User Interface Overview

The Aurum Launcher has a futuristic dark theme with the following sections:

### Main Storefront (User View)
- **Header**: Shows "AURUM STUDIOS" logo and admin login button
- **Unlock Code Input**: Enter codes to unlock games
- **My Games**: Shows games you've unlocked with PLAY buttons
- **Store/Available Games**: Browse all available games

## For Users

### Redeeming Unlock Codes

1. Obtain an unlock code from an admin or purchase
2. Enter the code in the input field at the top of the launcher
3. Click the "Redeem" button
4. If valid, the game will be unlocked and appear in "My Games"

**Code Format**: Codes are 8-character alphanumeric strings (e.g., `ABC12345`)

### Playing Games

1. Find your unlocked game in the "My Games" section
2. Click the **▶ PLAY** button
3. The game will launch (currently a placeholder - actual game launching to be implemented)

### Viewing Available Games

- Scroll through the "Available Games" or "Store" section
- Locked games show a 🔒 icon
- Each game displays:
  - Title
  - Description
  - Price/Info
  - Status (Locked/Unlocked)

## For Admins

### Logging In

1. Click "Admin Login" in the top-right corner
2. Enter admin credentials:
   - **Email**: `semvanhunsel@gmail.com`
   - **Password**: `58143663`
3. Click "Login"

### Admin Dashboard

Once logged in, you'll see additional controls:

#### Adding Games

1. Click "Add Game" button
2. Fill in the game details:
   - **Title**: Game name
   - **Description**: Game description
   - **Image URL**: Link to game cover image (optional)
   - **Price/Info**: Price or other information
3. Click "Add Game" to save

#### Generating Unlock Codes

1. Find the game you want to generate a code for
2. Click "Generate Code" button on the game card
3. A unique code will be generated and displayed
4. Share this code with users to unlock the game

**Note**: Each code can only be used once and is tied to a specific game.

#### Managing Unlock Codes

1. Click "View Codes" button in the dashboard
2. See all generated codes with:
   - Code string
   - Associated game
   - Status (Available/Used)
   - Creation date
   - Usage date (if used)

#### Deleting Games

1. Find the game you want to remove
2. Click "Delete" button on the game card
3. The game will be disabled (not permanently deleted)

#### Exiting Admin Mode

Click "Exit Admin" to return to the user storefront view.

## Tips & Tricks

### For Users
- Codes are case-insensitive (ABC123 = abc123)
- Already unlocked games can't be unlocked again
- Your game library persists across app restarts
- Games are listed with newest unlocks first

### For Admins
- Generate codes before distributing to users
- Track code usage in the "View Codes" section
- You can generate multiple codes for the same game
- Deleted games are hidden but codes remain in the system

## Data & Storage

### Where is data stored?

All launcher data is stored locally in an SQLite database at:
- **Windows**: `%APPDATA%/aurum-launcher/aurum-launcher.db`

This includes:
- Game library
- Generated unlock codes
- User unlocked games
- Admin credentials

### Backing Up Your Data

To backup your data:
1. Close the Aurum Launcher
2. Navigate to `%APPDATA%/aurum-launcher/`
3. Copy the `aurum-launcher.db` file
4. Store it safely

To restore:
1. Close the Aurum Launcher
2. Replace the database file with your backup
3. Restart the launcher

## Troubleshooting

### Can't Redeem Code

**Problem**: "Invalid or already used code" message

**Solutions**:
- Check code spelling (case doesn't matter)
- Verify the code hasn't been used already
- Ensure you don't already own the game
- Contact admin for a new code if needed

### Game Won't Launch

**Problem**: PLAY button doesn't launch game

**Note**: Game launching is currently a placeholder feature. Actual game integration would be implemented based on your specific games and launch requirements.

### Admin Login Failed

**Problem**: Can't log in as admin

**Solutions**:
- Double-check email: `semvanhunsel@gmail.com`
- Double-check password: `58143663`
- Ensure no extra spaces before/after credentials

### Database Issues

**Problem**: Data not persisting or corrupted database

**Solutions**:
1. Close the launcher
2. Delete the database file (it will recreate)
3. Restart the launcher
4. Note: This will erase all data

### App Won't Start

**Problem**: Launcher crashes or won't open

**Solutions**:
1. Restart your computer
2. Reinstall the launcher
3. Check Windows Event Viewer for errors
4. Ensure Windows 10/11 is up to date

## Keyboard Shortcuts

- **Ctrl+Shift+I**: Open DevTools (development only)
- **Escape**: Close dialogs/forms
- **Enter**: Submit forms

## Feature Roadmap

Upcoming features (not yet implemented):
- Actual game launching and management
- Multiple user profiles
- Cloud sync for game progress
- Achievement system
- Payment integration for buying games
- Game installation and updates
- Friends and social features

## Support

For technical support or questions:
1. Check this user guide
2. Review the README.md file
3. Contact Aurum Studios support

## Security Notes

- Admin password is stored in plain text in code (for demo purposes)
- For production use, implement proper authentication
- Unlock codes are one-time use only
- Database is stored locally (not encrypted)

## Getting Started Checklist

### For New Users
- ✓ Install the launcher
- ✓ Launch the application
- ✓ Enter an unlock code
- ✓ Play your unlocked games

### For New Admins
- ✓ Log in with admin credentials
- ✓ Add your first game
- ✓ Generate unlock codes
- ✓ Distribute codes to users
- ✓ Monitor code usage

Enjoy using Aurum Launcher! 🎮
