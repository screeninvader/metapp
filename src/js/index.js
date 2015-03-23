import Navigator from './lib/navigator';
import {outerHeight, each} from './lib/utils';
import is from 'is';
import options from './options';
import './lib/options';
import './lib/pagesize';

var routes = [
    '/',
    '/options'
];

new Navigator(routes);
