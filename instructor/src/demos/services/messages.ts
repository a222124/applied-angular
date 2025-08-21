import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' }) // you don't have to create a provider for this, but once you do, it will create different instances.
export class MessageService {
  #message = 'Hello World';
  #http = inject(HttpClient);
  constructor() {
    console.log('Message Service Created');
  }

  getMessage() {
    return this.#message;
  }

  setMessage(newMessage: string) {
    this.#message = newMessage;
  }
}
