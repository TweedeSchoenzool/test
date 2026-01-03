const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Database = require('better-sqlite3');
const { v4: uuidv4 } = require('uuid');

let mainWindow;
let db;

function createDatabase() {
  const userDataPath = app.getPath('userData');
  const dbPath = path.join(userDataPath, 'aurum-launcher.db');
  
  db = new Database(dbPath);
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      image TEXT,
      price TEXT,
      enabled INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS unlock_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      game_id INTEGER NOT NULL,
      used INTEGER DEFAULT 0,
      used_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (game_id) REFERENCES games (id)
    );
    
    CREATE TABLE IF NOT EXISTS user_unlocks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_id INTEGER NOT NULL,
      code_used TEXT NOT NULL,
      unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (game_id) REFERENCES games (id)
    );
  `);
  
  console.log('Database initialized at:', dbPath);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1000,
    minHeight: 600,
    backgroundColor: '#0a0a0f',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    frame: true,
    autoHideMenuBar: true,
  });

  const startUrl = app.isPackaged
    ? `file://${path.join(__dirname, '../out/index.html')}`
    : 'http://localhost:3000';

  mainWindow.loadURL(startUrl);

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createDatabase();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    db.close();
    app.quit();
  }
});

ipcMain.handle('admin-login', async (event, { email, password }) => {
  const validEmail = 'semvanhunsel@gmail.com';
  const validPassword = '58143663';
  
  return email === validEmail && password === validPassword;
});

ipcMain.handle('get-games', async () => {
  try {
    const games = db.prepare('SELECT * FROM games WHERE enabled = 1 ORDER BY created_at DESC').all();
    return { success: true, games };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-all-games', async () => {
  try {
    const games = db.prepare('SELECT * FROM games ORDER BY created_at DESC').all();
    return { success: true, games };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('add-game', async (event, gameData) => {
  try {
    const stmt = db.prepare('INSERT INTO games (title, description, image, price) VALUES (?, ?, ?, ?)');
    const info = stmt.run(gameData.title, gameData.description, gameData.image, gameData.price);
    return { success: true, gameId: info.lastInsertRowid };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('update-game', async (event, gameData) => {
  try {
    const stmt = db.prepare('UPDATE games SET title = ?, description = ?, image = ?, price = ? WHERE id = ?');
    stmt.run(gameData.title, gameData.description, gameData.image, gameData.price, gameData.id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('delete-game', async (event, gameId) => {
  try {
    const stmt = db.prepare('UPDATE games SET enabled = 0 WHERE id = ?');
    stmt.run(gameId);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('generate-unlock-code', async (event, gameId) => {
  try {
    const code = uuidv4().split('-')[0].toUpperCase();
    const stmt = db.prepare('INSERT INTO unlock_codes (code, game_id) VALUES (?, ?)');
    stmt.run(code, gameId);
    return { success: true, code };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-unlock-codes', async (event, gameId) => {
  try {
    const codes = db.prepare(`
      SELECT uc.*, g.title as game_title 
      FROM unlock_codes uc 
      JOIN games g ON uc.game_id = g.id 
      WHERE uc.game_id = ? 
      ORDER BY uc.created_at DESC
    `).all(gameId);
    return { success: true, codes };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-all-unlock-codes', async () => {
  try {
    const codes = db.prepare(`
      SELECT uc.*, g.title as game_title 
      FROM unlock_codes uc 
      JOIN games g ON uc.game_id = g.id 
      ORDER BY uc.created_at DESC
    `).all();
    return { success: true, codes };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('redeem-code', async (event, code) => {
  try {
    const unlockCode = db.prepare('SELECT * FROM unlock_codes WHERE code = ? AND used = 0').get(code.toUpperCase());
    
    if (!unlockCode) {
      return { success: false, error: 'Invalid or already used code' };
    }
    
    const alreadyUnlocked = db.prepare('SELECT * FROM user_unlocks WHERE game_id = ?').get(unlockCode.game_id);
    
    if (alreadyUnlocked) {
      return { success: false, error: 'You already own this game' };
    }
    
    const updateCode = db.prepare('UPDATE unlock_codes SET used = 1, used_at = CURRENT_TIMESTAMP WHERE id = ?');
    updateCode.run(unlockCode.id);
    
    const addUnlock = db.prepare('INSERT INTO user_unlocks (game_id, code_used) VALUES (?, ?)');
    addUnlock.run(unlockCode.game_id, code.toUpperCase());
    
    const game = db.prepare('SELECT * FROM games WHERE id = ?').get(unlockCode.game_id);
    
    return { success: true, game };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-user-unlocks', async () => {
  try {
    const unlocks = db.prepare(`
      SELECT g.* 
      FROM user_unlocks uu 
      JOIN games g ON uu.game_id = g.id 
      ORDER BY uu.unlocked_at DESC
    `).all();
    return { success: true, unlocks };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('launch-game', async (event, gameId) => {
  try {
    console.log('Launching game:', gameId);
    return { success: true, message: 'Game launched successfully' };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
