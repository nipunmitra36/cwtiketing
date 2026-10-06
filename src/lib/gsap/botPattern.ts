/**
 * Search and social crawlers. Used by the inline `<head>` script in the root
 * layout, which tags `<html class="is-bot">` before first paint.
 *
 * Lighthouse / PageSpeed are deliberately NOT matched — they should measure
 * what real visitors get.
 */
export const BOT_UA_PATTERN =
  "bot|crawl|spider|slurp|google-inspectiontool|bingpreview|facebookexternalhit|embedly|quora link preview|whatsapp|telegram|skypeuripreview|vkshare";
