import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ArticlesStore } from './stores/articles-store';

@Component({
  selector: 'app-articles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  providers: [ArticlesStore],
  template: `
    <div class="flex flex-row gap-4">
      <a routerLink="/articles" class="btn btn-sm btn-primary">List</a>
      <a routerLink="prefs" class="btn btn-sm btn-primary">Prefs</a>
    </div>

    <router-outlet />
  `,
  styles: ``,
})
export class Articles {}
