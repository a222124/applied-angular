import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FeatureNavLink } from './types';

@Component({
  selector: 'app-section-nav-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <a
      [routerLink]="link().href"
      [routerLinkActive]="['underline']"
      [routerLinkActiveOptions]="{ exact: true }"
      >{{ link().label }}</a
    >
  `,
  styles: ``,
})
export class SectionNavLink {
  link = input.required<FeatureNavLink>();
}
