import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>Counter Goes Here</p> `,
  styles: ``,
})
export class Counter {}
