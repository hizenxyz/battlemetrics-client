import { getClient } from "../client";
import { buildQueryString } from "../utils/buildQueryString";
import { GameListParams } from "../types/gamesParams";
import { GameListResponse, GameResponse } from "../types/responses";

export async function getGameList(
  params?: GameListParams
): Promise<GameListResponse> {
  const client = getClient();
  const queryString = params ? buildQueryString(params) : "";
  const url = queryString ? `/games?${queryString}` : "/games";
  const res = await client.get(url);
  return res.data;
}

export async function getGameInfo(gameId: string): Promise<GameResponse> {
  const client = getClient();
  const res = await client.get(`/games/${gameId}`);
  return res.data;
}
