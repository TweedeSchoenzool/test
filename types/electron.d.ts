export interface Game {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  enabled: number;
  created_at: string;
}

export interface UnlockCode {
  id: number;
  code: string;
  game_id: number;
  game_title: string;
  used: number;
  used_at: string | null;
  created_at: string;
}

export interface ElectronAPI {
  adminLogin: (credentials: { email: string; password: string }) => Promise<boolean>;
  getGames: () => Promise<{ success: boolean; games?: Game[]; error?: string }>;
  getAllGames: () => Promise<{ success: boolean; games?: Game[]; error?: string }>;
  addGame: (gameData: Partial<Game>) => Promise<{ success: boolean; gameId?: number; error?: string }>;
  updateGame: (gameData: Partial<Game>) => Promise<{ success: boolean; error?: string }>;
  deleteGame: (gameId: number) => Promise<{ success: boolean; error?: string }>;
  generateUnlockCode: (gameId: number) => Promise<{ success: boolean; code?: string; error?: string }>;
  getUnlockCodes: (gameId: number) => Promise<{ success: boolean; codes?: UnlockCode[]; error?: string }>;
  getAllUnlockCodes: () => Promise<{ success: boolean; codes?: UnlockCode[]; error?: string }>;
  redeemCode: (code: string) => Promise<{ success: boolean; game?: Game; error?: string }>;
  getUserUnlocks: () => Promise<{ success: boolean; unlocks?: Game[]; error?: string }>;
  launchGame: (gameId: number) => Promise<{ success: boolean; message?: string; error?: string }>;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
