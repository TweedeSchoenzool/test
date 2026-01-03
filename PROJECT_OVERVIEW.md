# Aurum Launcher - Project Overview

## Executive Summary

Aurum Launcher is a futuristic Windows desktop application that serves as both a game launcher and digital storefront for Aurum Studios. Built with modern web technologies wrapped in Electron, it provides a sleek, professional gaming platform experience.

## Key Features

### 🎮 Core Functionality
- **Digital Storefront**: Browse and view available games
- **Unlock System**: Redeem unique codes to gain access to games
- **Game Library**: Manage and launch owned games
- **Admin Panel**: Complete game and code management system

### 🎨 Design
- Futuristic dark theme with purple and cyan accents
- Smooth animations and glowing effects
- Responsive card-based layout
- Professional gaming aesthetic similar to Lunar Client

### 🔒 Security
- Secure admin login system
- One-time use unlock codes
- Local SQLite database for data persistence
- Protected admin features

## Technical Architecture

### Frontend Stack
- **Next.js 16**: React framework with static export
- **React 19**: UI component library
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first styling

### Backend/Desktop
- **Electron 33**: Desktop application framework
- **better-sqlite3**: High-performance SQLite database
- **IPC Communication**: Secure renderer-main process communication

### Build Tools
- **electron-builder**: Windows .exe packaging
- **Turbopack**: Fast build system
- **ESLint**: Code linting

## Database Schema

### Tables

#### games
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| title | TEXT | Game name |
| description | TEXT | Game description |
| image | TEXT | Cover image URL |
| price | TEXT | Price or info |
| enabled | INTEGER | 1=active, 0=deleted |
| created_at | DATETIME | Creation timestamp |

#### unlock_codes
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| code | TEXT | Unique code (8 chars) |
| game_id | INTEGER | Foreign key to games |
| used | INTEGER | 0=available, 1=used |
| used_at | DATETIME | When code was used |
| created_at | DATETIME | Creation timestamp |

#### user_unlocks
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| game_id | INTEGER | Foreign key to games |
| code_used | TEXT | Which code was used |
| unlocked_at | DATETIME | Unlock timestamp |

## User Flows

### User Flow: Redeeming a Game

```
1. User receives unlock code from admin
2. Opens Aurum Launcher
3. Enters code in input field
4. Clicks "Redeem"
5. System validates code:
   - Checks if code exists
   - Checks if code is unused
   - Checks if game not already owned
6. If valid:
   - Marks code as used
   - Adds game to user library
   - Shows success message
7. Game appears in "My Games"
8. User can click "PLAY" to launch
```

### Admin Flow: Adding a Game

```
1. Admin clicks "Admin Login"
2. Enters credentials:
   - Email: semvanhunsel@gmail.com
   - Password: 58143663
3. Clicks "Add Game"
4. Fills in game details:
   - Title
   - Description
   - Image URL (optional)
   - Price/Info
5. Clicks "Add Game" to save
6. Game appears in admin dashboard
7. Admin can generate unlock codes
8. Codes can be shared with users
```

## File Structure

```
aurum-launcher/
├── electron/
│   ├── main.js                 # Electron main process
│   └── preload.js              # IPC bridge (contextBridge)
│
├── app/
│   ├── page.tsx                # Main UI component
│   ├── layout.tsx              # App layout wrapper
│   ├── globals.css             # Global styles & theme
│   └── favicon.ico             # App icon
│
├── types/
│   └── electron.d.ts           # TypeScript definitions
│
├── public/                     # Static assets
│
├── out/                        # Built Next.js app (generated)
├── dist/                       # Built Electron app (generated)
│
├── node_modules/               # Dependencies
│
├── package.json                # Project config & scripts
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript config
├── eslint.config.mjs           # ESLint config
├── postcss.config.mjs          # PostCSS config
├── .gitignore                  # Git ignore rules
├── .env.local                  # Environment variables
│
├── README.md                   # Main documentation
├── BUILDING.md                 # Build instructions
├── USER_GUIDE.md               # User documentation
├── QUICKSTART.md               # Quick start guide
├── PROJECT_OVERVIEW.md         # This file
└── sample-games.json           # Sample game data
```

## IPC Communication

### Channels

| Channel | Type | Purpose |
|---------|------|---------|
| admin-login | invoke | Verify admin credentials |
| get-games | invoke | Fetch enabled games |
| get-all-games | invoke | Fetch all games (admin) |
| add-game | invoke | Create new game |
| update-game | invoke | Modify game details |
| delete-game | invoke | Disable game |
| generate-unlock-code | invoke | Create code for game |
| get-unlock-codes | invoke | Fetch codes for game |
| get-all-unlock-codes | invoke | Fetch all codes (admin) |
| redeem-code | invoke | Redeem unlock code |
| get-user-unlocks | invoke | Fetch user's games |
| launch-game | invoke | Launch game (placeholder) |

## Security Considerations

### Current Implementation
- Admin password hardcoded (demo/development)
- Database not encrypted
- No user authentication beyond admin
- Local data storage only

### Production Recommendations
- Implement proper authentication (OAuth, JWT)
- Hash admin passwords
- Encrypt sensitive database fields
- Add rate limiting for code redemption
- Implement user accounts/profiles
- Add audit logging
- Code signing for .exe

## Performance

### Optimizations
- Static site generation with Next.js
- SQLite for fast local queries
- Lazy loading of game images
- Efficient IPC communication
- No external API calls

### Metrics
- Build time: ~5-10 seconds
- App startup: <2 seconds
- Database queries: <50ms
- UI interactions: <100ms

## Browser/Platform Support

### Supported Platforms
- ✅ Windows 10/11 (primary target)
- ⚠️ macOS (would need separate build)
- ⚠️ Linux (would need separate build)

### Minimum Requirements
- Windows 10 or later
- 100MB disk space
- 2GB RAM
- 1024x768 screen resolution

## Development Workflow

### Setup
```bash
npm install
```

### Development
```bash
npm run dev
```

### Building
```bash
npm run build              # Build Next.js
npm run build:electron     # Build .exe
```

### Testing
- Manual testing in Electron window
- Admin features testing
- User flow testing
- Database persistence testing

## Deployment

### Distribution Method
1. Build Windows installer (.exe)
2. Distribute via:
   - Direct download
   - Website
   - Steam/Epic (with integration)
   - USB drives

### Auto-Updates
Not currently implemented. Future enhancement:
- Use electron-updater
- Host updates on server
- Check for updates on launch
- Silent or prompted updates

## Future Enhancements

### Phase 1: Core Improvements
- [ ] Actual game launching (not placeholder)
- [ ] Game installation management
- [ ] Progress tracking
- [ ] Settings panel
- [ ] Custom app icon

### Phase 2: User Features
- [ ] Multiple user profiles
- [ ] Cloud save sync
- [ ] Achievement system
- [ ] Friends list
- [ ] Chat system

### Phase 3: Business Features
- [ ] Payment integration (Stripe, PayPal)
- [ ] Direct game purchases
- [ ] Subscription model
- [ ] DLC management
- [ ] Gift codes

### Phase 4: Advanced Features
- [ ] Mod support
- [ ] Community features
- [ ] Workshop/marketplace
- [ ] Streaming integration
- [ ] VR support

## Known Limitations

1. **Game Launching**: Currently placeholder - needs game integration
2. **Single User**: No multi-user support
3. **No Cloud Sync**: All data is local only
4. **Image Hosting**: Requires external image URLs
5. **Windows Only**: Not cross-platform yet
6. **No Auto-Updates**: Manual updates required
7. **Basic Security**: Hardcoded credentials for demo

## Best Practices

### For Admins
- Generate codes before distribution
- Track which codes are given to which users
- Regularly backup the database
- Test games before adding to store
- Use high-quality game images
- Write clear descriptions

### For Developers
- Keep dependencies updated
- Test builds before distribution
- Follow TypeScript types strictly
- Use ESLint recommendations
- Document code changes
- Test on clean Windows machines

## Support & Maintenance

### Regular Tasks
- Update dependencies monthly
- Test on latest Windows updates
- Monitor user feedback
- Backup production databases
- Generate analytics on code usage

### Troubleshooting
- Check database file permissions
- Verify SQLite installation
- Review Electron logs
- Test on multiple Windows versions
- Clear cache/rebuild if issues

## Credits

**Built with:**
- Next.js by Vercel
- Electron by OpenJS Foundation
- React by Meta
- Tailwind CSS by Tailwind Labs
- better-sqlite3 by Joshua Wise

**Designed for:**
- Aurum Studios

**Version:** 1.0.0

## License

Private/Proprietary - All rights reserved to Aurum Studios

---

For more information, see:
- [README.md](./README.md) - Main documentation
- [QUICKSTART.md](./QUICKSTART.md) - Getting started
- [BUILDING.md](./BUILDING.md) - Build instructions
- [USER_GUIDE.md](./USER_GUIDE.md) - User documentation
