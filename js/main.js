let getRandom = function (min, max){
  if (min<0){
    return 'Задайте положительные числа';
  }
  if (max<=min){
    return 'Максимальная граница диапазона должна быть больше минимальной';
  } else {
    let randomNumber = Math.round (Math.random() * (max - min) + min);
    if (randomNumber===min){
      randomNumber = Math.round (Math.random() * (max - min) + min);
    }
    return randomNumber;
  }
};

let getLength = function (comment, maxLength){
  if (comment.length>maxLength){
    return false;
  }
  return true;
};