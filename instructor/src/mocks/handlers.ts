import { articlesHandlers } from './articles-handler';
import { Books_Handlers } from './books-handler';

export const handlers = [...articlesHandlers, ...Books_Handlers];
