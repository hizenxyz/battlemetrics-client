import { getClient } from "../client";
import { flattenParams } from "../utils/flattenParams";
import { GameListParams } from "../types/gamesParams";

export async function getGameList(params?: GameListParams) {
  const client = getClient();
  const flat = params ? flattenParams(params) : undefined;
  const res = await client.get("/games", {
    params: flat,
  });
  return res.data;
}

export async function getGameInfo(gameId: string) {
  const client = getClient();
  const res = await client.get(`/games/${gameId}`);
  return res.data;
}
