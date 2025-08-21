import { JsonPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, resource } from '@angular/core';

@Component({
  selector: 'app-books-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: `
    <p>Books List</p>

    <pre>
    {{ books.value() | json }}
</pre>
  `,
  styles: ``,
})
export class List {
  books = resource({
    loader: () => fetch('/api/books').then((b) => b.json()),
  });
}
