import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-horizontal-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <ul tabindex="0" class="menu menu-horizontal">
      @for (link of links(); track link.href) {
        <li>
          <a [routerLink]="link.href">{{ link.text }}</a>
        </li>
      }
    </ul>
  `,
  styles: ``,
})
export class NavHorizontalList {
  links = input.required<{ text: string; href: string }[]>();
}
