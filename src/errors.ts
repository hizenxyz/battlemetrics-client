export class BattleMetricsError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "BattleMetricsError";
  }
}

export class ValidationError extends BattleMetricsError {
  constructor(message: string) {
    super(message, 400);
    this.name = "ValidationError";
  }
}

export class AuthenticationError extends BattleMetricsError {
  constructor(message: string = "Authentication failed") {
    super(message, 401);
    this.name = "AuthenticationError";
  }
}
