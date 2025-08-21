import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiArticleItem, ApiArticles, ArticleCreateModel } from '../types';

export class ArticlesApi {
  #http = inject(HttpClient);

  getArticles() {
    return this.#http.get<ApiArticles>('https://fake.api.com/articles');
  }
  addArticle(article: ArticleCreateModel) {
    return this.#http.post<ApiArticleItem>(
      'https://fake.api.com/articles',
      article,
    );
  }
}
