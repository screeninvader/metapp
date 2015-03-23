import {each, startsWith} from './utils';
import is from 'is';
import Router from './router';
import page from 'page';
import hboot from 'hyperboot/rpc';

var self;

class Navigator {
  constructor(routes) {
    self = this;
    self.routes = routes;
    self.router = new Router(routes);
    self.links = document.querySelectorAll('a[data-href]');
    each(self.links, (link) => {
      self.addClickEventListener(link, self.toggleListener)
    });

    var configlink = document.querySelector('#update');
    if ( is.fn(configlink.addEventListener) ) {
      configlink.addEventListener('click', (e) => {
        if ( typeof hboot !== 'undefined' && is.fn(hboot.toggle) ) {
          hboot.toggle();
        } else {
          console.log('ui does not exist');
        }
      }, false);
    }
  }

  addClickEventListener(link, listener, bubble = false) {
    if ( is.fn(link.getAttribute ) ) {
      let href = link.getAttribute('data-href');
      link.addEventListener('click', listener, bubble);
    }
  }

  toggleListener(e) {
    if ( e.target && is.fn(e.target.getAttribute) ) {
      let href = e.target.getAttribute('data-href');
      if ( location.pathname === '/' + href ) {
        page('/');
      } else {
        page(href);
      }
      e.preventDefault();
      return false;
    }
  }
}

export default Navigator;
