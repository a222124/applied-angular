import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    @for (link of links(); track link.href) {
      <li>
        <a [routerLink]="link.href">{{ link.text }}</a>
      </li>
    }
  `,
  styles: ``,
})
export class NavList {
  // input

  links = input.required<{ text: string; href: string }[]>();
}
