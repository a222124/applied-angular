import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
export type FeatureNavLink = {
  href: string;
  label: string;
};
@Component({
  selector: 'app-section-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="navbar bg-base-300 shadow-sm my-8">
      @if (sectionName()) {
        <a routerLink="." class="btn btn-ghost text-xl">{{ sectionName() }}</a>
      }
      <ul class="menu menu-horizontal px-4">
        @for (link of links(); track link.href) {
          <li>
            <a
              [routerLink]="link.href"
              [routerLinkActive]="['underline']"
              [routerLinkActiveOptions]="{ exact: true }"
              >{{ link.label }}</a
            >
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
