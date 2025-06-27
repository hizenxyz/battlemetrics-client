import axios, { AxiosInstance } from "axios";

export function getClient(): AxiosInstance {
  const apiKey = process.env.BATTLEMETRICS_TOKEN;
  const baseUrl =
    process.env.BATTLEMETRICS_URL || "https://api.battlemetrics.com";

  if (!apiKey) {
    throw new Error("BATTLEMETRICS_TOKEN is not set in environment variables");
  }

  return axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}
