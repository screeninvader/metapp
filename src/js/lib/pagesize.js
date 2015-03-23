import is from 'is';
import {outerHeight, each} from './utils';


function calculatePageSize() {
  var pageSections = document.querySelectorAll('section.page')
    , headerHeight = outerHeight('header.main')
    , footerHeight = outerHeight('footer.main')
    , sectionHeight = window.innerHeight - headerHeight - footerHeight;

  each(pageSections, (section) => {
    if ( section && ! is.undefined(section.style) ) {
      section.style.height = sectionHeight + 'px';
    }
  });
}
calculatePageSize();
window.addEventListener('resize', calculatePageSize);
