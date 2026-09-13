import { pageById } from '../../config/pages.config';

export function getPageMetadata(pageId: string) {
  const page = pageById[pageId];
  if (!page) throw new Error(`Unknown page id: ${pageId}`);
  return page;
}
