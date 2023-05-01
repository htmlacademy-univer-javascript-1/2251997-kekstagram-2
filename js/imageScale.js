const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');
const ZOOM_STEP = 25;
const ZOOM_MIN = 25;
const ZOOM_MAX = 100;

const scaleBorders = function(num) {
  if (Number(num)>=ZOOM_MAX) {
    scaleValue.value = '100%';
    imgPreview.style.transform = 'scale(1.0)';
  }
  if (Number(num)<=ZOOM_MIN) {
    scaleValue.value = '25%';
    imgPreview.style.transform = 'scale(0.25)';
  }
};

const scaleHandlerSetting = function() {
  scaleBigger.addEventListener('click', () => {
    let numberValue = scaleValue.value.replace('%', '');
    numberValue = Number(numberValue)+ZOOM_STEP;
    scaleValue.value = `${numberValue}%`;
    imgPreview.style.transform = `scale(${Number(numberValue)/100})`;
    scaleBorders(numberValue);
  });

  scaleSmaller.addEventListener('click', () => {
    let numberValue = scaleValue.value.replace('%', '');
    numberValue = Number(numberValue)-ZOOM_STEP;
    scaleValue.value = `${numberValue}%`;
    imgPreview.style.transform = `scale(${Number(numberValue)/100})`;
    scaleBorders(numberValue);
  });
};

export {scaleHandlerSetting, imgPreview};
