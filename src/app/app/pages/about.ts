import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>All About Us</p> `,
  styles: ``,
})
export class About {}
