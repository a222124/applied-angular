import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-articles-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>Article List Goes Here</p> `,
  styles: ``,
})
export class List {}
