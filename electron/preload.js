const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  adminLogin: (credentials) => ipcRenderer.invoke('admin-login', credentials),
  getGames: () => ipcRenderer.invoke('get-games'),
  getAllGames: () => ipcRenderer.invoke('get-all-games'),
  addGame: (gameData) => ipcRenderer.invoke('add-game', gameData),
  updateGame: (gameData) => ipcRenderer.invoke('update-game', gameData),
  deleteGame: (gameId) => ipcRenderer.invoke('delete-game', gameId),
  generateUnlockCode: (gameId) => ipcRenderer.invoke('generate-unlock-code', gameId),
  getUnlockCodes: (gameId) => ipcRenderer.invoke('get-unlock-codes', gameId),
  getAllUnlockCodes: () => ipcRenderer.invoke('get-all-unlock-codes'),
  redeemCode: (code) => ipcRenderer.invoke('redeem-code', code),
  getUserUnlocks: () => ipcRenderer.invoke('get-user-unlocks'),
  launchGame: (gameId) => ipcRenderer.invoke('launch-game', gameId),
});
