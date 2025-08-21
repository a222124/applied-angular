import { delay, HttpResponse, http } from 'msw';

const Articles = [
  {
    id: '1',
    title: 'Angular Documentation',
    description: 'Comprehensive guide to Angular framework.',
    link: 'https://angular.dev/',
    added: '2025-08-18T17:14:10.029Z',
  },
  {
    id: '2',
    title: 'TypeScript Handbook',
    description: 'In-depth guide to TypeScript language.',
    link: 'https://www.typescriptlang.org/docs/handbook/intro.html',
    added: '2025-07-13T12:00:10.029Z',
  },
  {
    id: '3',
    title: 'NGRX Documentation',
    description: 'Comprehensive guide to NGRX state management.',
    link: 'https://ngrx.io/docs',
    added: '2025-06-10T09:30:00.000Z',
  },
  {
    id: '4',
    title: 'Mozilla Developer Network',
    description: 'Resources for developers from Mozilla.',
    link: 'https://developer.mozilla.org/',
    added: '2025-05-05T14:20:00.000Z',
  },
  {
    id: '5',
    title: 'RxJS Documentation',
    description: 'Learn about reactive programming with RxJS.',
    link: 'https://rxjs.dev/guide/overview',
    added: '2025-04-01T10:00:00.000Z',
  },
  {
    id: '6',
    title: 'Angular Testing Guide',
    description: 'Learn how to test Angular applications effectively.',
    link: 'https://angular.io/guide/testing',
    added: '2025-03-15T10:00:00.000Z',
  },
  {
    id: '7',
    title: 'Rainer Hahnekamp YouTube',
    description: 'YouTube channel of Rainer Hahnekamp.',
    link: 'https://www.youtube.com/@RainerHahnekamp',
    added: '2025-02-20T10:00:00.000Z',
  },
  {
    id: '8',
    title: 'Angular University',
    description: 'Online courses for Angular developers.',
    link: 'https://angular-university.io/',
    added: '2025-01-25T10:00:00.000Z',
  },
  {
    id: '9',
    title: 'Angular Material Documentation',
    description: 'Documentation for Angular Material components.',
    link: 'https://material.angular.io/',
    added: '2024-12-30T10:00:00.000Z',
  },
  {
    id: '10',
    title: 'Angular CLI Documentation',
    description: 'Learn how to use Angular CLI for development.',
    link: 'https://angular.io/cli',
    added: '2024-11-05T10:00:00.000Z',
  },
  {
    id: '11',
    title: 'JasperFx YouTube',
    description:
      'YouTube channel of JasperFx - nothing to do with Angular, but super handsome host on some videos.',
    link: 'https://www.youtube.com/@JasperFxSoftware',
    added: '2024-10-01T10:00:00.000Z',
  },
];

export const articlesHandlers = [
  http.get('https://fake.api.com/articles', async () => {
    await delay(); // 100 - 200ms delay, simulating close to real world.
    // return HttpResponse.json([]);
    return HttpResponse.json(Articles);
  }),
];
