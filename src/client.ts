export class BattleMetricsClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(
    apiKey: string,
    baseUrl: string = "https://api.battlemetrics.com",
  ) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;

    console.log("BattleMetrics client initialized");
  }

  getApiKey(): string {
    return this.apiKey;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
