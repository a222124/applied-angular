import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ArticlesStore } from './stores/articles-store';
import { ArticlesApi } from './services/articles-api';

@Component({
  selector: 'app-articles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  providers: [ArticlesStore, ArticlesApi],
  template: `
    <div class="flex flex-row gap-4">
      <a routerLink="demo-rxjs" class="btn btn-sm btn-primary">Demo</a>
      <a routerLink="/articles-rxjs" class="btn btn-sm btn-primary">List</a>
      <a routerLink="prefs-rxjs" class="btn btn-sm btn-primary">Prefs</a>
      <a routerLink="add-rxjs" class="btn btn-sm btn-primary">Add Article</a>
    </div>

    <router-outlet />
  `,
  styles: ``,
})
export class Articles {}
