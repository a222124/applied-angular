import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ApiArticleItem } from '../types';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, RouterLink],
  template: `
    <div class="card card-border bg-base-100 w-96">
      <div class="card-body">
        <h2 class="card-title">{{ article().title }}</h2>
        <p>{{ article().description }}</p>
        <p>{{ article().added | date }}</p>
        <div class="card-actions justify-end">
          <a [routerLink]="['details', article().id]" class="btn btn-primary"
            >Details</a
          >
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
