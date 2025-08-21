import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ArticlesApi } from '../services/articles-api';

@Component({
  selector: 'app-articles-rxjs-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Demo</p>
    <ul>
      @for (article of articles(); track article.id) {
        <li>{{ article.title }}</li>
      }
    </ul>
  `,
  styles: ``,
})
export class Demo {
  service = inject(ArticlesApi);

  articles$ = this.service.getArticles();

  articles = toSignal(this.service.getArticles());
  constructor() {
    // this.service
    //   .getArticles()
    //   .pipe(takeUntilDestroyed())
    //   .subscribe((r) => console.log(r));
  }
}
