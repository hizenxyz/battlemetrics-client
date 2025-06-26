import { PaginationDirection } from "./common";

export interface PageParams {
  /**
   * Page key for pagination.
   * Example: "100"
   */
  key: string;

  /**
   * Direction of pagination relative to the page key.
   * Example: "next"
   */
  rel: PaginationDirection;

  /**
   * Number of items to return per page (1-100).
   * Default: 100
   * Example: 42
   */
  size: number;
}
