import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ApiArticleItem } from '../types';

@Component({
  selector: 'app-article-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="card card-border bg-base-100 w-96">
      <div class="card-body">
        <h2 class="card-title">{{ article().title }}</h2>
        <p>{{ article().description }}</p>
        <div class="card-actions justify-end">
          <a [href]="article().link" target="_blank" class="btn btn-primary"
            >Visit</a
          >
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ArticleListItem {
  article = input.required<ApiArticleItem>();
}
