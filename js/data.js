import {getRandom, getLength} from './util';

let i=0;
let g=0;
const descriptionList=['Если вы хотите сделать что-то великое водин прекрасный день, помните: один прекрасный день - это сегодня',
  'С междунарожным женским днем!',
  'С 8 марта!',
  'Пусть каждый день будет как праздник',
  'В - значит весна!',
  'Открытки с кепкой в виде сердца',
  'До конца',
  'Про турецкие сериалы',
  'Весна ;)',
  'Very proud of our girl',
  'Я по-настоящему люблю этот мир',
  'Прадничный ужин',
  'Самая лучшая покупка эвааа',
  'Ждем именно тебя',
  'Уже в этот чертерг',
  'Polar stratosheric clouds',
  'Было?',
  'Это я в конце каждого рабочего дня',
  'Открытка с медведем',
  'Чего не хватает молодой маме?',
  'What are the symptons of the coffe addiction?',
  'Открыта вакансия',
  'Вечная проблема Наташи',
  'Ты знаешь, кому отправить',
  'What I eat in a Day'
];
const messageList = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const nameList = [
  'Полина',
  'Маша',
  'Арина',
  'Павел',
  'Роман',
  'Егор',
  'Шурик'
];

function creatObject() {
  i++;
  const creatComment = function () {
    g++;
    return {
      id: 100 + g,
      avatar: `img/avatar-${getRandom(1, 6)}.svg`,
      message: messageList[getRandom(0, messageList.length-1)],
      name: nameList[getRandom(0, nameList.length-1)]
    };
  };
  const similarComments=Array.from({length:getRandom(1,3)},creatComment);
  return {
    id: i,
    url: `photos/${i}.img`,
    description: descriptionList[i - 1],
    likes: getRandom(15, 200),
    comments: similarComments,
  };
}

const similarObjects=Array.from({length:25}, creatObject);

export {similarObjects};
