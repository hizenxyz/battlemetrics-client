/**
 * The set of possible resource types returned by the BattleMetrics API.
 */
export type ResourceType = "game";

/**
 * The set of possible pagination directions.
 */
export type PaginationDirection = "next" | "prev";

export interface PaginationLinks
  extends Partial<Record<PaginationDirection, string>> {
  first?: string;
  last?: string;
}
