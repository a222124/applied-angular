# "Take Aways"

- NgModules should be killed with fire.

Don't do these any more, there is _never_ a definsible position to create new modules.

```typescript
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [
    /*.... all the components need to be here */
  ],
  exports: [
    /*anything that you wan to provide to other modules should be here */
  ],
  imports: [
    /* other modules you want to import into this one*/
  ],
  providers: [
    /* the services providers for your application */
  ],
})
export class AppModule {}
```

### Use Signals

- State Management - someday _very soon_ we have to give up on Zone.js.
- It WILL go away. It is just "stable" to get rid of it as of TODAY (Angular 20.2.0)
- Zone-Js was a "hack" to do "clever" state management in early angular. It was "cool" for a while.

### No Modules, so things like "bundling" have changed, lazy load features, components, etc. so we keep the user experience happy.

### Use the `inject()` function

This means don't do constructor injection.

### The template flow syntax

Use things like `@for`, `@if`, `@switch`, `@let`, etc instead of their "old" structural directive versions.

```html
<h1 *ngIf="userIsLoggedIn">Hello, user</h1>
```

```html
@if(userIsLoggedIn()) {
<h1>Hello, User</h1>
}
```

## Plan for the Rest of Today

- Back to the Articles
- New Features (User State vs. Shared Store)
- Routing with params
- Create a "version" of our Articles using "old skool" rxjs stuff.

## Plan for Thursday

- Forms
- "Shared" stuff.
  - "Global" services
  - UI stuff.
- Lab 2
  - Will be the counter again and/or doing something "like" articles, API access, etc.
