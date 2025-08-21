import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MessageService } from './services/messages';

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
      <a class="btn btn-sm btn-primary" routerLink="services-demos">Services</a>
    </ul>
    <div class="container mx-auto p-4">
      <pre>Message Service {{ messageService.getMessage() }}</pre>
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class Demos {
  messageService = inject(MessageService);
}
