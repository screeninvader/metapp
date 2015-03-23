import is from 'is';
import options from '../options';
import {mergeObjects, hasLocalStorage} from './utils';
import {get, set} from './store';

var savedEle           = document.querySelector('#saved')
  , submitBtn          = document.querySelector('input[type=submit]')
;

function initOptions() {
  var slackomaticIpEle   = document.querySelector('#slackomatic')
    , screeninvaderIpEle = document.querySelector('#screeninvader')
    , storedOptions = get('options')
    , opts          = mergeObjects(options, storedOptions)
    , activeThemeEle = document.querySelector(`#${opts.theme}`)
  ;
  document.body.classList.add(opts.theme);

  if ( screeninvaderIpEle && is.fn(screeninvaderIpEle.setAttribute) ) {
    screeninvaderIpEle.setAttribute('value', opts.ip.screeninvader);
  }
  if ( slackomaticIpEle && is.fn(slackomaticIpEle.setAttribute) ) {
    slackomaticIpEle.setAttribute('value', opts.ip.slackomatic);
  }

  if ( activeThemeEle && is.fn(activeThemeEle.setAttribute) ) {
    activeThemeEle.setAttribute('checked', true);
  }

  submitBtn.addEventListener('click', (e) => {
    saveOptions();
  }, false);

  set('options', opts);
}

function getTheme() {
  var input = document.querySelector('.themesettings input[type="radio"]:checked')
    , theme = input.value || 'light'
  ;
  return theme;
}

function saveOptions() {
  var body = document.body
    , slackomaticIpEle   = document.querySelector('#slackomatic')
    , screeninvaderIpEle = document.querySelector('#screeninvader')
    , newOptions = {
        ip: {
          slackomatic  : slackomaticIpEle.value || '10.20.30.90'
        , screeninvader: screeninvaderIpEle.value || '10.20.30.40'
        }
      , theme: getTheme()
    }
    , opts = mergeObjects(options, newOptions);
  ;

  set( 'options', opts );

  body.classList.remove('dark');
  body.classList.remove('light');
  body.classList.add(opts.theme);

  if ( is.object(savedEle.classList) ) {
    savedEle.classList.add('visible');
    setTimeout( () => {
      savedEle.classList.remove('visible');
    }, 300);
  }
}

initOptions();
