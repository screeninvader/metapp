import page from 'page';
import {each} from './utils';
import is from 'is';

class Router {
  constructor(routes) {
    var self = this;
    page.base('/');
    page('/', this.render);
    page(':page', this.render);
    page('*', this.redirect);
    page();
  }

  redirect() {
    if ( location.pathname !== '/' ) {
      page('/');
    }
  }

  render(ctx, next) {
    var pages = document.querySelectorAll('section.page')
      , path  = ctx.path === '/' ? 'home' : ctx.path
      , query = `section.page#${path}`
      , page  = document.querySelector(query)
    ;

    each(pages, (p) => {
      if ( p && p.classList && is.fn(p.classList.remove) ) {
        p.classList.remove('active');
      }
    });

    if ( page && page.classList && is.fn(page.classList.add) ) {
      page.classList.add('active');
    }
  }
}

export default Router;
