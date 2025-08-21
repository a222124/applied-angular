import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { ArticlesStore } from '../stores/articles-store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-articles-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: `
    <p>Showing Details for Article {{ id() }}</p>

    @if (selectedArticle()) {
      <pre>{{ selectedArticle() | json }}</pre>
    } @else {
      <p>Four Oh Four! No Article With that Id</p>
    }
  `,
  styles: ``,
})
export class Details {
  id = input.required<string>();
  store = inject(ArticlesStore);

  selectedArticle = computed(() => {
    const id = this.id();
    const articles = this.store.articles.value(); // this says - "Get me all the articles, and if they aren't loaded, load them."

    return articles?.find((a) => a.id === id);
  });
}
