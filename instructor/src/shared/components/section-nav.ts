import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SectionNavLink } from './section-nav-link';
import { FeatureNavLink } from './types';

@Component({
  selector: 'app-section-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, SectionNavLink],
  template: `
    <div class="navbar bg-base-300 shadow-sm my-8">
      @if (sectionName()) {
        <a routerLink="." class="btn btn-ghost text-xl">{{ sectionName() }}</a>
      }
      <ul class="menu menu-horizontal px-4">
        @for (link of links(); track link.href) {
          <li>
            <app-section-nav-link [link]="link" />
          </li>
        }
      </ul>
    </div>

    <ng-content></ng-content>

    <router-outlet />
  `,
  styles: ``,
})
export class SectionNav {
  sectionName = input<string | undefined>(undefined);
  links = input.required<FeatureNavLink[]>();
}
