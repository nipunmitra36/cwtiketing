import type { FeaturePageData } from "./types";

/** Product Demo section on the bus ticketing page (id set in shared/ProductDemo). */
export const DEMO_PAGE = "/bus-ticketing-system";
export const DEMO_ANCHOR = "see-the-platform";

/** Internal link to the Product Demo, opening the tab that matches this feature page. */
export function demoHref(data: Pick<FeaturePageData, "demoTab">): string {
  const query = data.demoTab ? `?demo=${data.demoTab}` : "";
  return `${DEMO_PAGE}${query}#${DEMO_ANCHOR}`;
}
