import {isEscapeKey} from './util.js';
import {imgPreview} from './imageScale.js';
import {slider, imageFilters} from './imageFilters.js';
import {sendData} from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const imgUploadForm = document.querySelector('.img-upload__form');
const imgCloseButton = imgUploadForm.querySelector('.img-upload__cancel');
const editingForm = imgUploadForm.querySelector('.img-upload__overlay');
const hashtags = imgUploadForm.querySelector('.text__hashtags');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const textDescription = imgUploadForm.querySelector('.text__description');
const errorTemplate = document.querySelector('#error').content.querySelector('section');
const successTemplate = document.querySelector('#success').content.querySelector('section');
const submitButton = document.querySelector('.img-upload__submit');

const openFormSettings = function() {
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgPreview.querySelector('img').src = URL.createObjectURL(file);
    document.body.classList.add('modal-open');
    editingForm.classList.remove('hidden');
  }
};

const closeEditingForm = function() {
  editingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadInput.innerHTML = '';
  hashtags.value = '';
  textDescription.value = '';
  imgPreview.style.transform = 'scale(1)';
  imgPreview.classList = ['img-upload__preview'];
  imgPreview.style.filter = '';
  slider.style.display = 'none';
  document.getElementById('effect-none').checked = true;
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

const blockSubmitButton = function() {
  submitButton.disabled = true;
};

const unblockSubmitButton = function() {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};

const showMessage = function(template, buttonClass, cb) {
  const message = template.cloneNode(true);
  const removeErrorMessage = () => {
    document.body.removeChild(message);
    cb();
  };

  const windowRemove = function() {
    removeErrorMessage();
    document.removeEventListener('keydown', escRemove);
  };

  function escRemove(evt) {
    if (message.parentNode) {
      if (isEscapeKey(evt)) {
        window.removeEventListener('click', windowRemove);
        removeErrorMessage();
      }}
  }

  editingForm.classList.add('hidden');
  document.body.append(message);
  window.addEventListener('click', windowRemove, {once: true});

  message.querySelector('div').addEventListener('click', (evt) => {
    evt.stopPropagation();
  });

  message.querySelector(buttonClass).addEventListener('click', () => {
    removeErrorMessage();
    window.removeEventListener('click', windowRemove);
    document.removeEventListener('keydown', escRemove);
  });

  document.addEventListener('keydown', escRemove, {once: true});
  unblockSubmitButton();
};

const showSuccesForm = function() {
  showMessage(successTemplate, '.success__button', () => closeEditingForm());
};

const showErrorForm = () => {
  document.body.classList.remove('modal-open');
  showMessage(errorTemplate, '.error__button', () => {
    editingForm.classList.remove('hidden');
  });
};

const re = /^((#[A-Za-zА-Яа-яЁё0-9]{1,19})\s*|)+$$/;
const MAX_HASHTAG_NUMBER = 5;

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
  return !((hashtagsList.length > MAX_HASHTAG_NUMBER));
};

const validateForm = function() {
  pristine.addValidator(hashtags, validateHashtagsValue, 'Неверно введенный хэш-тег');
  pristine.addValidator(hashtags, validateHashtagsSimilar, 'Вижу одинаковые хэш-теги');
  pristine.addValidator(hashtags, validateHashtagsMax, 'Превышен максимальный лимит хэш-тегов');

  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(showSuccesForm, showErrorForm, formData);
    }
  });
};

const imgOpenForm = function() {
  imgUploadInput.addEventListener('change', openFormSettings);

  hashtags.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
  textDescription.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });

  addHandlersToCloseForm();
  validateForm();
  imageFilters();
};

export{imgOpenForm};
