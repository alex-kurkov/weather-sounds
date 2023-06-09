import data from './data';
import './styles.scss';

const PLAYING_CLASS = 'playing';

// Получаем необходимые для работы DOM ноды
const root = document.querySelector('#app');
const seasons = root.querySelector('.seasons');
const cardTemplate = root.querySelector('#card-template');
const audio = root.querySelector('#audio');
const volume = root.querySelector('#volume');

// хелпер получения из DOM элемента с иконкой по id
function getIconElementById(id) {
  return seasons.querySelector(`.icon[data-id=${id}]`);
}

// рендерим карточки в DOM
data.forEach(({ id, image, icon }) => {
  const cardItem = cardTemplate.content.cloneNode(true);
  const cardElement = cardItem.querySelector('.seasons-card');
  const iconElement = cardItem.querySelector('.icon');
  cardElement.dataset.id = id;
  iconElement.dataset.id = id;
  cardElement.style.backgroundImage = image;
  iconElement.style.backgroundImage = icon;

  seasons.append(cardItem);
});

// стейт-переменная приложения + установка начальных значений
let currentSeason = data[0];
// eslint-disable-next-line no-use-before-define
let currentSeasonIconElement = getIconElementById(currentSeason.id);

// хендлеры и хелперы
function setSeason() {
  root.style.backgroundImage = currentSeason.image;
  audio.src = currentSeason.sound;
}

function setVolumeHandler(e) {
  audio.volume = e.target.value;
}

function clickCardHandler(e) {
  if (audio.readyState !== 4) return;

  const clickedSeasonId = e.target.dataset.id;
  const clickedSeasonIcon = getIconElementById(clickedSeasonId);

  if (currentSeason.id !== clickedSeasonId) {
    currentSeason = data.find((i) => i.id === clickedSeasonId);
    currentSeasonIconElement.classList.remove(PLAYING_CLASS);
    currentSeasonIconElement = clickedSeasonIcon;
    currentSeasonIconElement.classList.add(PLAYING_CLASS);
    setSeason();
    audio.play();
    return;
  }

  if (audio.paused) {
    currentSeasonIconElement.classList.add(PLAYING_CLASS);
    audio.play();
  } else {
    clickedSeasonIcon.classList.remove(PLAYING_CLASS);
    audio.pause();
  }
}

// установка слушателей
seasons.addEventListener('click', clickCardHandler);
volume.addEventListener('input', setVolumeHandler);

// пуск
setSeason();
