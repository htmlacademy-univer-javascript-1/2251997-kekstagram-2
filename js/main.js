import {creatObject} from './data.js';
import {creatMiniatures} from './miniatures.js';
import {imgOpenForm} from './editForm.js';

const similarObjects=Array.from({length:12}, creatObject);

creatMiniatures(similarObjects);
imgOpenForm();
