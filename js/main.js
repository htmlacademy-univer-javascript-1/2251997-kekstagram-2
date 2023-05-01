import {creatObject} from './data.js';
import {creatMiniatures} from './miniatures.js';
import {imgOpenForm} from './editForm.js';
import {scaleHandlerSetting} from './imageScale.js';
import {imageFilters} from './imageFilters.js';

const similarObjects=Array.from({length:25}, creatObject);

creatMiniatures(similarObjects);
imgOpenForm();
scaleHandlerSetting();
imageFilters();
