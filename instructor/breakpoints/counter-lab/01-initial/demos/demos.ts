import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-demos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <ul>
      <a class="btn btn-sm btn-primary" routerLink="basic-signals"
        >Basic Signals</a
      >
      <a class="btn btn-sm btn-primary" routerLink="advanced-signals"
        >Advanced Signals</a
      >
    </ul>
    <div class="container mx-auto p-4">
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class Demos {}
