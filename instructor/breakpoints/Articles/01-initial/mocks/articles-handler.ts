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
];

export const articlesHandlers = [
  http.get('https://fake.api.com/articles', async () => {
    await delay();
    return HttpResponse.json(Articles);
  }),
];
