import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-counter-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <button class="btn btn-primary">-</button>
      <span>0</span>
      <button class="btn btn-primary">+</button>
    </div>
  `,
  styles: ``,
})
export class Ui {}
