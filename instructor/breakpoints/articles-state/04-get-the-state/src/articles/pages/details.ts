import {
    ChangeDetectionStrategy,
    Component,
    input
} from '@angular/core';

@Component({
  selector: 'app-articles-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>Showing Details for Article {{ id() }}</p> `,
  styles: ``,
})
export class Details {
  id = input.required<number>();
}
