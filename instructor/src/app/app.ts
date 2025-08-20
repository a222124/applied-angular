import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar />
    <main class="container mx-auto">
      <router-outlet />
    </main>
  `,
  styles: [],
  imports: [Navbar, RouterOutlet],
})
export class App {}
// "@Script" - a whole new programming language that compiles to JavaScript. - That became (reverted to TypeScript)
// A compiler for our templates. (Now called "Ivy", or "ngc" ) - a language BASED on but not HTML. It compiles to JavaScript.
