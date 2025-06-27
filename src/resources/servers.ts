// src/resources/servers.ts
import { getClient } from "../client";
import { buildQueryString } from "../utils/buildQueryString";
import { ServerListParams } from "../types/serversParams";
import { ServerListResponse, ServerResponse } from "../types/reponses";

export async function getServerList(
  params?: ServerListParams
): Promise<ServerListResponse> {
  const client = getClient();

  if (params) {
    console.log(params);
  }

  const queryString = params ? buildQueryString(params) : "";
  const url = queryString ? `/servers?${queryString}` : "/servers";
  console.log("URL: ", url);

  const res = await client.get(url);
  return res.data;
}

export async function getServerInfo(serverId: string): Promise<ServerResponse> {
  const client = getClient();
  const res = await client.get(`/servers/${serverId}`);
  return res.data;
}
