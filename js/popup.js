import {similarObjects} from './data.js';

const photoOtherUsers=document.querySelector('.pictures');
const usersPhotoTemplate=document.querySelectorAll('#picture').content.querySelector('a');
const similarPhotosFragment=document.createDocumentFragment();
const fullPhotoInfo={};

similarObjects.forEach((photo) => {
  const usersPhoto=usersPhotoTemplate.cloneNode(true);
  const otherUsersImg=usersPhoto.querySelector('.picture__img');
  otherUsersImg.src=usersPhoto.url;
  const otherUsersLikes=usersPhoto.querySelector('.picture__likes');
  otherUsersLikes.textContent=photo.likes;
  const otherUsersComments=usersPhoto.querySelector('.picture__comments');
  otherUsersComments.textContent=photo.comments.length;
  fullPhotoInfo[otherUsersImg.src]=photo.comments;
  fullPhotoInfo[`${otherUsersImg.src} description`]=photo.description;
  similarPhotosFragment.append(usersPhoto);
});

photoOtherUsers.append(similarPhotosFragment);

export {photoOtherUsers, fullPhotoInfo};
