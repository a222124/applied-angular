import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { ArticlesStore } from '../stores/articles-store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-articles-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe],
  template: `
    @if (selectedArticle(); as article) {
      <div class="card card-border bg-base-200 w-full h-full my-8 ">
        <div class="card-body">
          <h2 class="card-title">
            @if (article.isOnReadingList) {
              <span class="text-yellow-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <!-- Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                  <path
                    fill="currentColor"
                    d="m8.125 7.092l2.608-3.47q.238-.322.566-.472T12 3t.701.15t.566.471l2.608 3.471l4.02 1.368q.534.18.822.605q.289.426.289.94q0 .237-.07.471t-.228.449l-2.635 3.573l.1 3.83q.025.706-.466 1.189T16.564 20l-.454-.056L12 18.733l-4.11 1.211q-.124.05-.24.053q-.117.003-.214.003q-.665 0-1.15-.483t-.459-1.188l.1-3.856l-2.629-3.548q-.159-.217-.229-.453Q3 10.236 3 10q0-.506.297-.942q.296-.435.828-.618z"
                  />
                </svg>
              </span>
            }
            {{ article.title }}
          </h2>
          <p>{{ article.description }}</p>
          <p>{{ article.added | date }}</p>
          <div class="card-actions justify-end"></div>
        </div>
      </div>
      @if (isOnMyReadingList()) {
        <button
          (click)="store.removeFromReadingList(id())"
          class="btn btn-primary"
        >
          Remove From Reading List
        </button>
      } @else {
        <button (click)="store.addToReadingList(id())" class="btn btn-primary">
          Add To Reading List
        </button>
      }
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
    const articles = this.store.sortedList(); // this says - "Get me all the articles, and if they aren't loaded, load them."

    return articles?.find((a) => a.id === id);
  });

  isOnMyReadingList = computed(() => {
    const id = this.id();
    const readingList = this.store.readingListIds();
    return readingList.some((a) => a === id);
  });
}
