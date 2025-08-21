import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MessageService } from '../services/messages';

@Component({
  selector: 'app-demos-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  providers: [MessageService],
  template: ` <p>Services Demos</p> `,
  styles: ``,
})
export class ServiceDemos {
  messageService = inject(MessageService);
}
