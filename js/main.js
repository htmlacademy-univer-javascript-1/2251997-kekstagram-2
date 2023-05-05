import {imgOpenForm} from './editForm.js';
import {scaleHandlerSetting} from './imageScale.js';
import {getData} from './api.js';
import {createMiniatures} from './miniatures.js';
import {imageFiltering} from './filters.js';

getData(createMiniatures);
getData (imageFiltering);
imgOpenForm();
scaleHandlerSetting();
