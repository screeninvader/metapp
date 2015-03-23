import is from 'is';

export function set(key, value) {
  if ( ! is.string(key) ) {
    console.log('you tried storing a value with a non string key. stopped.');
  }
  if ( enabled() ) {
    localStorage.setItem(key, JSON.stringify(value) );
  }
}

export function get(key) {
  if ( enabled() ) {
    return JSON.parse(localStorage.getItem(key));
  }
}


export function enabled() {
  try {
      localStorage.setItem('itemtest235', 'mod');
      localStorage.removeItem('itemtest235');
      return true;
  } catch(e) {
      return false;
  }
}

