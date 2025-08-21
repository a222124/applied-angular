import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FeatureNavLink, SectionNav } from '../shared/components/';
import { ArticlesStore } from './stores/articles-store';
import { AuthStore } from '../shared/stores/auth';

@Component({
  selector: 'app-articles',
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [SectionNav],
  providers: [ArticlesStore],
  template: `
    <app-section-nav sectionName="Articles" [links]="actualLinks()">
      <div>
        <p>
          Specific stuff for articles goes here. Welcome
          {{ authStore.userName() || 'anon' }}
        </p>
      </div>
    </app-section-nav>
  `,
  styles: ``,
})
export class Articles {
  authStore = inject(AuthStore);
  links = signal<(FeatureNavLink & { needsAuth: boolean })[]>([
    {
      label: 'Articles',
      href: '.',
      needsAuth: false,
    },
    {
      label: 'Prefs',
      href: 'prefs',
      needsAuth: false,
    },
    {
      label: 'Add An Article',
      href: 'add',
      needsAuth: true,
    },
  ]);

  actualLinks = computed(() => {
    const isAuthenticated = this.authStore.isLoggedIn();
    const links = this.links().filter((link) =>
      link.needsAuth === true ? isAuthenticated : true,
    );
    return links;
  });
}
