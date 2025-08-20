import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavList } from './nav-list';
import { NavHorizontalList } from './nav-horizontal-list';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NavList, NavHorizontalList],
  template: `
    <div class="navbar bg-base-100 shadow-sm">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <app-nav-list [links]="links()" />
          </ul>
        </div>
        <a routerLink="home" class="btn btn-ghost text-xl">Applied Angular</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <app-nav-horizontal-list [links]="links()" />
      </div>
      <div class="navbar-end">
        <a class="btn">Button</a>
      </div>
    </div>
  `,
  styles: ``,
})
export class Navbar {
  links = signal([
    {
      text: 'Home',
      href: '/home',
    },
    {
      text: 'Demos',
      href: '/demos',
    },
    {
      text: 'About',
      href: '/about',
    },
    {
      text: 'Articles',
      href: '/articles',
    },
    {
      text: 'Counter',
      href: '/counter',
    },
  ]);
}
