import is from 'is';

export var emptyFun = function(){};

export function each (arrOrObj, fun, callback ) {
  var isObj     = ( is.a(arrOrObj, 'object') || is.object(arrOrObj) )
    , isArr     = ( is.a(arrOrObj, 'array') )
    , selfName  = 'magic-utils each:'
    , results   = []
    , objCount  = count(arrOrObj)
    , loopCount = 0
  ;
  fun      = fun || emptyFun;
  callback = callback || emptyFun;

  if ( ! isArr && ! isObj ) {
    let warn = `${selfName} Array Or Object expected: ${typeof arrOrObj}`;
    return console.warn(warn);
  } 

  for ( let key in arrOrObj ) {
    if ( arrOrObj.hasOwnProperty(key) ) {
      ++loopCount;
      results.push( fun(arrOrObj[key], key) );
      if ( objCount === loopCount ) {
        callback(results);
      }
    }
  }
}

/*
* Recursively merge properties of two objects 
*/
export function mergeObjects(obj1, obj2) {
  for (var p in obj2) {
    if ( obj2.hasOwnProperty(p) ) {
      try {
        // Property in destination object set; update its value.
        if ( obj2[p].constructor == Object ) {
          obj1[p] = mergeObjects(obj1[p], obj2[p]);
        } else {
          obj1[p] = obj2[p];
        }
      } catch(e) {
        // Property in destination object not set; create it and set its value.
        obj1[p] = obj2[p];

      }
    }
  }
  return obj1;
}


export function count(arrOrObj) {
  var num = 0;
  if ( typeof arrOrObj.length === 'number') { return arrOrObj.length; }

  each(arrOrObj, () => {
    num += 1;
  });
  return num;
}


export function slugify(string) {
  if ( ! string || ! is.string(string) ) { 
    throw Error(`magic-utils: slugify called without string argument: ${string}`); 
  }
  return string.replace(/[^\w\s]/g, '').toLowerCase().replace(/ /g, '-');
}

export function startsWith(needle, haystack) {
  return ( haystack.indexOf(needle) === 0 )
}
export function endswith(needle, haystack) {
  return ( haystack.indexOf(needle) === haystack.length - needle.length )
}

export function contains(needle, haystack ) {
  return ( haystack.indexOf(needle) > -1 )
}


/*
 * Gets the outer Height of divs, including margin
 */
export function outerHeight(el) {
  // Get the DOM Node if you pass in a string
  el = (typeof el === 'string') ? document.querySelector(el) : el; 

  if ( ! el ) {
    return 0;
  }
  var styles = window.getComputedStyle(el);
  var margin = parseFloat(styles['marginTop']) +
               parseFloat(styles['marginBottom']);

  return Math.ceil(el.offsetHeight + margin);
}

/*
 * Gets the outer Width of divs, including margin
 */
export function outerWidth(el) {
  // Get the DOM Node if you pass in a string
  el = (typeof el === 'string') ? document.querySelector(el) : el; 

  if ( ! el ) {
    return 0;
  }
  var styles = window.getComputedStyle(el);
  var margin = parseFloat(styles['marginLeft']) +
               parseFloat(styles['marginRight']);

  return Math.ceil(el.offsetWidth + margin);
}
