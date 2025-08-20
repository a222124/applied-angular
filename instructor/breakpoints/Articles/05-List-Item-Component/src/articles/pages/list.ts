import { ChangeDetectionStrategy, Component, resource } from '@angular/core';
import { ApiArticles } from '../types';
import { ArticleListItem } from '../components/article-list-item';

@Component({
  selector: 'app-articles-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArticleListItem],
  template: `
    <p>Article List Goes Here</p>
    <div class="grid grid-rows">
      @for (article of articlesResource.value(); track article.id) {
        <app-article-list-item [article]="article" />
      }
    </div>
    @if (articlesResource.error()) {
      <div class="alert alert-error">
        There was an error. {{ articlesResource.error() }}
      </div>
    }
  `,
  styles: ``,
})
export class List {
  // something new an still "experimental" in Angular, but I use it all the time.
  articlesResource = resource<ApiArticles, unknown>({
    loader: () => fetch('https://fake.api.com/articles').then((r) => r.json()),
  });
}
