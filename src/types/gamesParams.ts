import { PageParams } from "./commonParams";
import { GameAttributes } from "./games";

/**
 * Query parameters for listing games from BattleMetrics.
 */
export interface GameListParams {
  fields: {
    /**
     * Request only specific attributes of the game be returned.
     * Example: "name"
     */
    game: keyof GameAttributes | (keyof GameAttributes)[];
  };

  /**
   * Params for paginating the result set.
   */
  page: PageParams;
}
