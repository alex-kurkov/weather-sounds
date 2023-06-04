import data from './data';
import './styles.scss';

// Получаем необходимые для работы DOM ноды
const root = document.querySelector('#app');
const seasons = root.querySelector('.seasons');
const cardTemplate = root.querySelector('#card-template');
const audio = root.querySelector('#audio');
const volume = root.querySelector('#volume');

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

  if (currentSeason.id === e.target.dataset.id) {
    audio.paused ? audio.play() : audio.pause();
  } else {
    currentSeason = data.find((i) => i.id === e.target.dataset.id);
    setSeason();
    audio.play();
  }
}

// установка слушателей
seasons.addEventListener('click', clickCardHandler);
volume.addEventListener('input', setVolumeHandler);

// пуск
setSeason();
