import {createFullSizePhoto} from './fullSizePhoto.js';

const photoOtherUsers=document.querySelector('.pictures');
const usersPhotoTemplate=document.querySelector('#picture').content.querySelector('a');
const similarPhotosFragment=document.createDocumentFragment();

const createMiniatures=function(description){
  description.forEach((photo) => {
    const usersPhoto=usersPhotoTemplate.cloneNode(true);
    const otherUsersImg=usersPhoto.querySelector('.picture__img');
    otherUsersImg.src=photo.url;
    const otherUsersLikes=usersPhoto.querySelector('.picture__likes');
    otherUsersLikes.textContent=photo.likes;
    const otherUsersComments=usersPhoto.querySelector('.picture__comments');
    otherUsersComments.textContent=photo.comments.length;
    similarPhotosFragment.append(usersPhoto);
    otherUsersImg.addEventListener('click',(evt)=>{
      evt.preventDefault();
      createFullSizePhoto(usersPhoto, otherUsersLikes.textContent, photo.comments, photo.description);
    });
  });
  photoOtherUsers.append(similarPhotosFragment);
};

export {createMiniatures};
