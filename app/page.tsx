'use client';

import { useState, useEffect } from 'react';
import { Game, UnlockCode } from '../types/electron';

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [unlockedGames, setUnlockedGames] = useState<Game[]>([]);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [unlockCodes, setUnlockCodes] = useState<UnlockCode[]>([]);
  const [redeemCode, setRedeemCode] = useState('');
  const [message, setMessage] = useState('');
  const [showAddGame, setShowAddGame] = useState(false);
  const [showCodes, setShowCodes] = useState(false);
  const [newGame, setNewGame] = useState({
    title: '',
    description: '',
    image: '',
    price: ''
  });

  const loadGames = async () => {
    if (typeof window !== 'undefined' && window.electron) {
      const result = await window.electron.getGames();
      if (result.success && result.games) {
        setGames(result.games);
      }
    }
  };

  const loadUnlockedGames = async () => {
    if (typeof window !== 'undefined' && window.electron) {
      const result = await window.electron.getUserUnlocks();
      if (result.success && result.unlocks) {
        setUnlockedGames(result.unlocks);
      }
    }
  };

  useEffect(() => {
    loadGames();
    loadUnlockedGames();
  }, []);

  const loadAllGames = async () => {
    if (typeof window !== 'undefined' && window.electron) {
      const result = await window.electron.getAllGames();
      if (result.success && result.games) {
        setAllGames(result.games);
      }
    }
  };

  const loadAllUnlockCodes = async () => {
    if (typeof window !== 'undefined' && window.electron) {
      const result = await window.electron.getAllUnlockCodes();
      if (result.success && result.codes) {
        setUnlockCodes(result.codes);
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.electron) {
      const result = await window.electron.adminLogin({ email, password });
      if (result) {
        setIsAdmin(true);
        setShowLogin(false);
        setMessage('Admin login successful');
        await loadAllGames();
        await loadAllUnlockCodes();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Invalid credentials');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.electron) {
      const result = await window.electron.addGame(newGame);
      if (result.success) {
        setMessage('Game added successfully');
        setShowAddGame(false);
        setNewGame({ title: '', description: '', image: '', price: '' });
        await loadGames();
        await loadAllGames();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(result.error || 'Failed to add game');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  const handleDeleteGame = async (gameId: number) => {
    if (typeof window !== 'undefined' && window.electron) {
      const result = await window.electron.deleteGame(gameId);
      if (result.success) {
        setMessage('Game deleted successfully');
        await loadGames();
        await loadAllGames();
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  const handleGenerateCode = async (gameId: number) => {
    if (typeof window !== 'undefined' && window.electron) {
      const result = await window.electron.generateUnlockCode(gameId);
      if (result.success && result.code) {
        setMessage(`Code generated: ${result.code}`);
        await loadAllUnlockCodes();
        setTimeout(() => setMessage(''), 5000);
      }
    }
  };

  const handleRedeemCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.electron) {
      const result = await window.electron.redeemCode(redeemCode);
      if (result.success && result.game) {
        setMessage(`Successfully unlocked: ${result.game.title}`);
        setRedeemCode('');
        await loadUnlockedGames();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(result.error || 'Failed to redeem code');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  const handleLaunchGame = async (gameId: number, title: string) => {
    if (typeof window !== 'undefined' && window.electron) {
      const result = await window.electron.launchGame(gameId);
      if (result.success) {
        setMessage(`Launching ${title}...`);
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  const isGameUnlocked = (gameId: number) => {
    return unlockedGames.some(game => game.id === gameId);
  };

  if (showLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 futuristic-glow" style={{ color: 'var(--primary)' }}>
              AURUM STUDIOS
            </h1>
            <p className="text-gray-400">Admin Login</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6 p-8 rounded-lg" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full px-4 py-3 rounded-lg text-white"
                placeholder="admin@aurumstudios.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field w-full px-4 py-3 rounded-lg text-white"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="flex gap-4">
              <button
                type="submit"
                className="btn-primary flex-1 px-6 py-3 rounded-lg font-semibold text-white"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="btn-secondary flex-1 px-6 py-3 rounded-lg font-semibold text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (showAddGame && isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: 'var(--primary)' }}>
            Add New Game
          </h2>
          
          <form onSubmit={handleAddGame} className="space-y-6 p-8 rounded-lg" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={newGame.title}
                onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
                className="input-field w-full px-4 py-3 rounded-lg text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={newGame.description}
                onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
                className="input-field w-full px-4 py-3 rounded-lg text-white"
                rows={4}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="text"
                value={newGame.image}
                onChange={(e) => setNewGame({ ...newGame, image: e.target.value })}
                className="input-field w-full px-4 py-3 rounded-lg text-white"
                placeholder="https://..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Price/Info</label>
              <input
                type="text"
                value={newGame.price}
                onChange={(e) => setNewGame({ ...newGame, price: e.target.value })}
                className="input-field w-full px-4 py-3 rounded-lg text-white"
                placeholder="$29.99"
                required
              />
            </div>
            
            <div className="flex gap-4">
              <button
                type="submit"
                className="btn-primary flex-1 px-6 py-3 rounded-lg font-semibold text-white"
              >
                Add Game
              </button>
              <button
                type="button"
                onClick={() => setShowAddGame(false)}
                className="btn-secondary flex-1 px-6 py-3 rounded-lg font-semibold text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (showCodes && isAdmin) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>
              Unlock Codes
            </h2>
            <button
              onClick={() => setShowCodes(false)}
              className="btn-secondary px-6 py-2 rounded-lg font-semibold text-white"
            >
              Back
            </button>
          </div>
          
          <div className="space-y-4">
            {unlockCodes.map((code) => (
              <div
                key={code.id}
                className="p-6 rounded-lg flex justify-between items-center"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
              >
                <div>
                  <p className="font-bold text-xl" style={{ color: 'var(--secondary)' }}>
                    {code.code}
                  </p>
                  <p className="text-gray-400">{code.game_title}</p>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(code.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      code.used
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {code.used ? 'Used' : 'Available'}
                  </span>
                  {code.used && code.used_at && (
                    <p className="text-xs text-gray-500 mt-2">
                      Used: {new Date(code.used_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {unlockCodes.length === 0 && (
              <p className="text-center text-gray-400 py-12">No unlock codes generated yet</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold futuristic-glow" style={{ color: 'var(--primary)' }}>
                AURUM STUDIOS
              </h1>
              <p className="text-gray-400 mt-2">Admin Dashboard</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowCodes(true)}
                className="btn-secondary px-6 py-2 rounded-lg font-semibold text-white"
              >
                View Codes
              </button>
              <button
                onClick={() => setShowAddGame(true)}
                className="btn-primary px-6 py-3 rounded-lg font-semibold text-white"
              >
                Add Game
              </button>
              <button
                onClick={() => setIsAdmin(false)}
                className="btn-secondary px-6 py-2 rounded-lg font-semibold text-white"
              >
                Exit Admin
              </button>
            </div>
          </div>

          {message && (
            <div className="mb-6 p-4 rounded-lg futuristic-glow-cyan" style={{ background: 'var(--card-bg)', border: '1px solid var(--secondary)' }}>
              <p className="text-center font-semibold" style={{ color: 'var(--secondary)' }}>{message}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allGames.map((game) => (
              <div key={game.id} className="game-card rounded-lg overflow-hidden">
                {game.image && (
                  <div className="h-48 bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
                    <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                  </div>
                )}
                {!game.image && (
                  <div className="h-48 bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
                    <p className="text-6xl">🎮</p>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{game.description}</p>
                  <p className="text-xl font-semibold mb-4" style={{ color: 'var(--accent)' }}>
                    {game.price}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleGenerateCode(game.id)}
                      className="btn-primary flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                    >
                      Generate Code
                    </button>
                    <button
                      onClick={() => handleDeleteGame(game.id)}
                      className="btn-secondary px-4 py-2 rounded-lg text-sm font-semibold text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {allGames.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-400 mb-6">No games in the library yet</p>
              <button
                onClick={() => setShowAddGame(true)}
                className="btn-primary px-8 py-3 rounded-lg font-semibold text-white"
              >
                Add Your First Game
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-6" style={{ borderColor: 'var(--border)', background: 'var(--card-bg)' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold futuristic-glow" style={{ color: 'var(--primary)' }}>
              AURUM STUDIOS
            </h1>
            <p className="text-gray-400 text-sm mt-1">Game Launcher</p>
          </div>
          <button
            onClick={() => setShowLogin(true)}
            className="btn-secondary px-6 py-2 rounded-lg font-semibold text-white"
          >
            Admin Login
          </button>
        </div>
      </header>

      <main className="flex-1 p-8 overflow-y-auto scrollbar-thin">
        <div className="max-w-7xl mx-auto">
          {message && (
            <div className="mb-6 p-4 rounded-lg futuristic-glow-cyan" style={{ background: 'var(--card-bg)', border: '1px solid var(--secondary)' }}>
              <p className="text-center font-semibold" style={{ color: 'var(--secondary)' }}>{message}</p>
            </div>
          )}

          <div className="mb-8 max-w-2xl mx-auto">
            <form onSubmit={handleRedeemCode} className="flex gap-4">
              <input
                type="text"
                value={redeemCode}
                onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
                className="input-field flex-1 px-6 py-4 rounded-lg text-white text-lg"
                placeholder="Enter unlock code"
              />
              <button
                type="submit"
                className="btn-primary px-8 py-4 rounded-lg font-semibold text-white"
              >
                Redeem
              </button>
            </form>
          </div>

          {unlockedGames.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--secondary)' }}>
                My Games
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {unlockedGames.map((game) => (
                  <div key={game.id} className="game-card rounded-lg overflow-hidden">
                    {game.image && (
                      <div className="h-48 bg-gradient-to-br from-purple-900/50 to-blue-900/50">
                        <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    {!game.image && (
                      <div className="h-48 bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
                        <p className="text-6xl">🎮</p>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
                      <p className="text-gray-400 mb-4 line-clamp-2">{game.description}</p>
                      <button
                        onClick={() => handleLaunchGame(game.id, game.title)}
                        className="btn-primary w-full px-6 py-3 rounded-lg font-semibold text-white"
                      >
                        ▶ PLAY
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
              {unlockedGames.length > 0 ? 'Store' : 'Available Games'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <div key={game.id} className="game-card rounded-lg overflow-hidden opacity-75">
                  {game.image && (
                    <div className="h-48 bg-gradient-to-br from-purple-900/50 to-blue-900/50">
                      <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  {!game.image && (
                    <div className="h-48 bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
                      <p className="text-6xl">🎮</p>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">{game.description}</p>
                    <p className="text-xl font-semibold mb-4" style={{ color: 'var(--accent)' }}>
                      {game.price}
                    </p>
                    {isGameUnlocked(game.id) ? (
                      <button
                        onClick={() => handleLaunchGame(game.id, game.title)}
                        className="btn-primary w-full px-6 py-3 rounded-lg font-semibold text-white"
                      >
                        ▶ PLAY
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full px-6 py-3 rounded-lg font-semibold text-gray-500 cursor-not-allowed"
                        style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
                      >
                        🔒 Locked
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {games.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-400">No games available in the store yet</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
