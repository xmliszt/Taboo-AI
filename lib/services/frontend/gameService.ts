import IGame from '../../../types/game.interface';
import ILevel from '../../../types/level.interface';
import IScore from '../../../types/score.interface';

interface ErrorResponse {
  error: string;
}

async function request<T>(url: string, method: string, body?: any): Promise<T> {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error);
  }

  const data: T = await response.json();
  return data;
}

export const saveGame = async (level: ILevel, scores: IScore[]) => {
  const url = `/api/games/save`;
  await request<{ message: string }>(url, 'POST', {
    level,
    scores,
  });
};

export const getOneGameByID = async (game_id: number) => {
  const url = `/api/games/${game_id}/get`;
  return await request<IGame>(url, 'GET');
};

export const getAllGames = async (page: number, limit = 50) => {
  const url = `/api/games/get?pageIndex=${page}&limit=${limit}`;
  return await request<{ games: IGame[] }>(url, 'GET');
};

export const getAllGamesByLevel = async (
  level: string,
  page: number,
  limit = 50
) => {
  const url = `/api/games/get?level=${level}&pageIndex=${page}&limit=${limit}`;
  return await request<{ games: IGame[] }>(url, 'GET');
};

export const getAllGamesByPlayerID = async (
  player_id: string,
  page: number,
  limit = 50
) => {
  const url = `/api/games/get?player_id=${player_id}&pageIndex=${page}&limit=${limit}`;
  return await request<{ games: IGame[] }>(url, 'GET');
};

export const getAllGamesByPlayerNickname = async (
  player_nickname: string,
  page: number,
  limit = 50
) => {
  const url = `/api/games/get?player_nickname=${player_nickname}&pageIndex=${page}&limit=${limit}`;
  return await request<{ games: IGame[] }>(url, 'GET');
};

export const getBestGamesByLevel = async (level: string, limit = 5) => {
  const url = `/api/games/best/get?level=${level}&limit=${limit}`;
  return await request<{ games: IGame[] }>(url, 'GET');
};

export const getBestGamesByNickname = async (nickname: string, limit = 5) => {
  const url = `/api/games/best/get?player_nickname=${nickname}&limit=${limit}`;
  return await request<{ games: IGame[] }>(url, 'GET');
};

export const getBestGamesByNicknameAndLevel = async (
  level: string,
  nickname: string,
  limit = 5
) => {
  const url = `/api/games/best/get?level=${level}&player_nickname=${nickname}limit=${limit}`;
  return await request<{ games: IGame[] }>(url, 'GET');
};
