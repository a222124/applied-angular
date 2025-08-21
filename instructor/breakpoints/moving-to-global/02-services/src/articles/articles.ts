import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FeatureNavLink, SectionNav } from '../shared/components/section-nav';
import { ArticlesStore } from './stores/articles-store';

@Component({
  selector: 'app-articles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionNav],
  providers: [ArticlesStore],
  template: `
    <app-section-nav sectionName="Articles" [links]="links()">
      <div>
        <p>Specific stuff for articles goes here</p>
      </div>
    </app-section-nav>
  `,
  styles: ``,
})
export class Articles {
  links = signal<FeatureNavLink[]>([
    {
      label: 'Articles',
      href: '.',
    },
    {
      label: 'Prefs',
      href: 'prefs',
    },
  ]);
}
