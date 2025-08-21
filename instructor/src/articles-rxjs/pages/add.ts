import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ArticlesStore } from '../stores/articles-store';
import { ArticleCreateModel, FormGroupType } from '../types';
import { DevIndicator } from '../../shared/components/dev-indicator';
@Component({
  selector: 'app-articles-rxjs-add',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CommonModule, JsonPipe, DevIndicator],
  template: `
    <section class="py-8">
      <h1 id="add-article-heading" class="text-2xl font-bold mb-4">
        Add Article
      </h1>
      <form
        [formGroup]="form"
        class="form-control w-full max-w-lg"
        aria-labelledby="add-article-heading"
        (ngSubmit)="submit()"
      >
        <div class="form-control mb-4">
          <label for="title" class="label">
            <span class="label-text">Title</span>
          </label>
          <input
            id="title"
            type="text"
            formControlName="title"
            class="input input-bordered w-full"
            required
            aria-required="true"
            [attr.aria-invalid]="
              form.controls.title.invalid && form.controls.title.touched
                ? 'true'
                : 'false'
            "
            aria-describedby="title-errors"
          />
          @if (form.controls.title.touched && form.controls.title.invalid) {
            @let title = form.controls.title;
            <div id="title-errors" class="text-error mt-1" role="alert">
              @if (title.errors?.['required']) {
                <span>Title is required.</span>
              }
              @if (title.errors?.['minlength']) {
                <span>Title must be at least 5 characters.</span>
              }
              @if (title.errors?.['maxlength']) {
                <span>Title must be at most 100 characters.</span>
              }
              @defer {
                <app-dev-indicator>
                  <pre>{{ form.controls.title.errors | json }}</pre>
                </app-dev-indicator>
              }
            </div>
          }
        </div>
        <div class="form-control mb-4">
          <label for="description" class="label">
            <span class="label-text">Description</span>
          </label>
          <textarea
            id="description"
            formControlName="description"
            class="textarea textarea-bordered w-full"
            required
            aria-required="true"
            [attr.aria-invalid]="
              form.controls.description.invalid &&
              form.controls.description.touched
                ? 'true'
                : 'false'
            "
            aria-describedby="description-errors"
          ></textarea>
          @if (
            form.controls.description.touched &&
            form.controls.description.invalid
          ) {
            @let description = form.controls.description;
            <div id="description-errors" class="text-error mt-1" role="alert">
              @if (description.errors?.['required']) {
                <span>Description is required.</span>
              }
              @if (description.errors?.['minlength']) {
                <span>Description must be at least 10 characters.</span>
              }
              @if (description.errors?.['maxlength']) {
                <span>Description must be at most 500 characters.</span>
              }
            </div>
          }
        </div>
        <div class="form-control mb-4">
          <label for="link" class="label">
            <span class="label-text">Link</span>
          </label>
          <input
            id="link"
            type="url"
            formControlName="link"
            class="input input-bordered w-full"
            required
            aria-required="true"
            [attr.aria-invalid]="
              form.controls.link.invalid && form.controls.link.touched
                ? 'true'
                : 'false'
            "
            aria-describedby="link-errors"
          />
          @if (form.controls.link.touched && form.controls.link.invalid) {
            @let link = form.controls.link;
            <div id="link-errors" class="text-error mt-1" role="alert">
              @if (link.errors?.['required']) {
                <span>Link is required.</span>
              }
              @if (link.errors?.['pattern']) {
                <span
                  >Link must be a valid URL (starting with http:// or
                  https://).</span
                >
              }
            </div>
          }
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          [attr.aria-disabled]="form.invalid ? 'true' : 'false'"
        >
          Submit
        </button>
      </form>
    </section>
  `,
  styles: ``,
})
export class Add {
  store = inject(ArticlesStore);
  form = new FormGroup<FormGroupType<ArticleCreateModel>>({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500),
      ],
    }),
    link: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('https?://.+')],
    }),
  });

  submit() {
    if (this.form.valid) {
      const article: ArticleCreateModel = this.form.value as ArticleCreateModel;
      // Here you would typically call a service to save the article
      console.log('Article submitted:', article);
      // Reset the form after submission
      this.store.add(article);
      this.form.reset();
    } else {
      this.form.markAllAsTouched(); // Mark all controls as touched to show validation errors
    }
  }
}
