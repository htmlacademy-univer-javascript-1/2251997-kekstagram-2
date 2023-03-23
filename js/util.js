const getRandom = function (min, max){
  if (min<0 || max<0){
    throw new RangeError ('Задайте положительные числа');
  }
  if (typeof min!=='number' || typeof max!=='number'){
    throw new RangeError ('Задайте число');
  }
  else {
    if (max<=min){
      const swap=max;
      max=min;
      min=swap;
    }
    const randomNumber = Math.round (Math.random() * (max - min+1) + min);
    return randomNumber;
  };
};
  
const getLength = function (comment, maxLength){
  if (typeof comment!=='string'){
    throw new RangeError ('Задайте строку');
  }
  return comment.length<=maxLength;
};

export {getRandom, getLength};
