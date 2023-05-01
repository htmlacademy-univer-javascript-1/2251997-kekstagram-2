import {isEscapeKey} from './util.js';
import {imgPreview} from './imageScale.js';
import {slider} from './imageFilters.js';

const imgOpenButton = document.querySelector('.img-upload__label');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgCloseButton = imgUploadForm.querySelector('.img-upload__cancel');
const editingForm = imgUploadForm.querySelector('.img-upload__overlay');
const hashtags = imgUploadForm.querySelector('.text__hashtags');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const textDescription = imgUploadForm.querySelector('.text__description');

const openFormSettings = function(evt){
  evt.preventDefault();
  document.body.classList.add('modal-open');
  editingForm.classList.remove('hidden');
  slider.style.display = 'none';
  document.getElementById('effect-none').checked = true;
};

const closeEditingForm = function(){
  editingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadInput.innerHTML = '';
  hashtags.value = '';
  textDescription.value = '';
  imgPreview.style.transform = 'scale(1)';
  imgPreview.classList = ['img-upload__preview'];
  imgPreview.style.filter = '';
};

const addHandlersToCloseForm = function() {
  imgCloseButton.addEventListener ('click', () => {
    closeEditingForm();
  });

  document.addEventListener('keydown', (evt)=> {
    if (isEscapeKey(evt)) {
      closeEditingForm();
    }
  });
};

const re = /^((#[A-Za-zА-Яа-яЁё0-9]{1,19})\s*|)+$$/;
const MAX_COMMENT_LENGTH = 5;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text'
}, true);

const validateHashtagsValue = () => re.test(hashtags.value);

const validateHashtagsSimilar = function() {
  const hashtagsList = hashtags.value.split(' ');
  const newHashtagsList = [];

  hashtagsList.forEach((hashtag) => {
    newHashtagsList.push(hashtag.toLowerCase());
  });

  const unique = Array.from(new Set(newHashtagsList));
  return (unique.length === newHashtagsList.length);
};

const validateHashtagsMax = function() {
  const hashtagsList = hashtags.value.split(' ');
  return !((hashtagsList.length > MAX_COMMENT_LENGTH));
};

const validateForm = function() {
  pristine.addValidator(hashtags, validateHashtagsValue, 'Неверно введенный хэш-тег');
  pristine.addValidator(hashtags, validateHashtagsSimilar, 'Вижу одинаковые хэш-теги');
  pristine.addValidator(hashtags, validateHashtagsMax, 'Превышен максимальный лимит хэш-тегов');

  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

const imgOpenForm = function() {
  imgOpenButton.addEventListener('click', openFormSettings);

  hashtags.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
  textDescription.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });

  addHandlersToCloseForm();
  validateForm();
};

export{imgOpenForm};
