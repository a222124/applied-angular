/*   {
    "id": "1",
    "title": "Angular Documentation",
    "description": "Comprehensive guide to Angular framework.",
    "link": "https://angular.dev/",
    "added": "2025-08-18T17:14:10.029Z"
  }*/

export type ApiArticleItem = {
  id: string;
  title: string;
  description: string;
  link: string;
  added: string;
};

export type ApiArticles = ApiArticleItem[];

export type ArticleSortOptions = 'oldestFirst' | 'newestFirst';

export type ApiArticleModel = ApiArticleItem & { isOnReadingList: boolean };
