import { Router, RouterConfiguration } from 'aurelia-router';
import 'bootstrap';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;

    config.title = 'my-books';
    config.map([
      { route: ['', 'home'], name: 'home', moduleId: 'index' },
      { route: 'books', name: 'books', moduleId: './resources/elements/books' }
    ]);
  }
}
