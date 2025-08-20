import { JsonPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, resource } from '@angular/core';

@Component({
  selector: 'app-articles-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: `
    <p>Article List Goes Here</p>
    <pre>{{ articlesResource.value() | json }}</pre>
    @if (articlesResource.error()) {
      <div class="alert alert-error">
        There was an error. {{ articlesResource.error() }}
      </div>
    }
  `,
  styles: ``,
})
export class List {
  // something new an still "experimental" in Angular, but I use it all the time.
  articlesResource = resource({
    loader: () => fetch('https://fake.api.com/articles').then((r) => r.json()),
  });
}
