import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="flex flex-row gap-4">
      <a
        routerLink="ui"
        [routerLinkActive]="['underline', 'font-bold']"
        class="btn btn-sm btn-primary "
        >Count!</a
      >
      <a
        routerLink="prefs"
        [routerLinkActive]="['underline', 'font-bold']"
        class="btn btn-sm btn-primary"
        >Prefs</a
      >
    </div>
    <div class="m-4 p-8">
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class Counter {}
