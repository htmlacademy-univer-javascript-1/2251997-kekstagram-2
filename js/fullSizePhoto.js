import {isEscapeKey} from './util.js';

const fullSizePhoto=document.querySelector('.big-picture');
const fullSizePhotoSocialComments=fullSizePhoto.querySelector('.social__comments');
const closeButton=fullSizePhoto.querySelector('.big-picture__cancel');
const socialCommentCount=fullSizePhoto.querySelector('.social__comment-count');
const commentsLoader=fullSizePhoto.querySelector('.comments-loader');
const commentTemlate=document.querySelector('#comment').content.querySelector('li');

const createFullSizePhotoComment=function(commentInfo){
  const fullSizePhotoComment=commentTemlate.cloneNode(true);
  const userPhoto=fullSizePhotoSocialComments.querySelector('img');
  userPhoto.src=commentInfo.avatar;
  userPhoto.alt=commentInfo.name;
  fullSizePhotoComment.querySelector('p').textContent=commentInfo.message;
  return fullSizePhotoComment;
};

const openFullSizePhoto = function(){
  document.body.classList.add('modal-open');
  fullSizePhoto.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
};

const closeFullSizePhoto = function(){
  closeButton.addEventListener ('click', () => {
    fullSizePhoto.classList.add('hidden');
    document.body.classList.remove('modal-open');
    fullSizePhotoSocialComments.innerHTML = '';
  });
  document.addEventListener('keydown', (evt)=> {
    if (isEscapeKey(evt)) {
      fullSizePhoto.classList.add('hidden');
      document.body.classList.remove('modal-open');
      fullSizePhotoSocialComments.innerHTML = '';
    }
  }, {once: true});
};

const createFullSizePhoto= function(miniature, likes, comments, description){
  openFullSizePhoto();
  fullSizePhoto.querySelector('.big-picture__img img').src = miniature.querySelector('img').src;
  fullSizePhoto.querySelector('.social__caption').textContent = description;
  fullSizePhoto.querySelector('.likes-count').textContent = likes;

  comments.slice(0, 5).forEach((comment) => {
    const newComment = createFullSizePhotoComment(comment);
    fullSizePhotoSocialComments.append(newComment);
  });
  socialCommentCount.textContent = `${fullSizePhotoSocialComments.querySelectorAll('li').length} из ${comments.length} комментариев`;

  if (fullSizePhotoSocialComments.querySelectorAll('li').length === comments.length) {
    commentsLoader.classList.add('hidden');
  }

  let commentCurrentMinLength = 5;
  let commentCurrentMaxLength = 10;

  commentsLoader.addEventListener('click', () => {
    comments.slice(commentCurrentMinLength, commentCurrentMaxLength).forEach((comment) => {
      const newComment = createFullSizePhotoComment(comment);
      fullSizePhotoSocialComments.append(newComment);
    });
    commentCurrentMinLength+=5;
    commentCurrentMaxLength+=5;
    if (fullSizePhotoSocialComments.querySelectorAll('li').length === comments.length) {
      commentsLoader.classList.add('hidden');
    }
    socialCommentCount.textContent = `${fullSizePhotoSocialComments.querySelectorAll('li').length} из ${comments.length} комментариев`;
  });

  closeFullSizePhoto();
};

export {createFullSizePhoto};
