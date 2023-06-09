import data from './data';
import './styles.scss';
const PLAYING_CLASS = 'playing';

try {
  // Получаем необходимые для работы DOM ноды
  const root = document.querySelector('#app') as HTMLElement;
  if (!root) throw new Error('no root element found');

  // далее везде применяю type assertion для упрощения кода вместо проверок элементов на null
  const seasons = root.querySelector('.seasons')!;
  const cardTemplate = root.querySelector('#card-template') as HTMLTemplateElement;
  const audio = root.querySelector('#audio') as HTMLAudioElement;
  const volume = root.querySelector('#volume') as HTMLInputElement;

  // хелпер получения из DOM элемента с иконкой по id
  function getIconElementById(id: string) {
    return seasons.querySelector(`.icon[data-id=${id}]`) as HTMLDivElement;
  }

  // рендерим карточки в DOM
  data.forEach(({ id, image, icon }) => {
    const cardItem = cardTemplate.content.cloneNode(true) as HTMLLIElement;
    const cardElement = cardItem.querySelector('.seasons-card') as HTMLElement;
    const iconElement = cardItem.querySelector('.icon') as HTMLElement; 
    cardElement.dataset.id = id;
    iconElement!.dataset.id = id;
    cardElement!.style.backgroundImage = image;
    iconElement!.style.backgroundImage = icon;

    seasons.append(cardItem);
  });

  // стейт-переменная приложения + установка начальных значений
  let currentSeason: ISeason = data[0];
  // eslint-disable-next-line no-use-before-define
  let currentSeasonIconElement = getIconElementById(currentSeason.id);

  // хендлеры и хелперы
  function setSeason() {
    root!.style.backgroundImage = currentSeason.image;
    audio.src = currentSeason.sound;
  }

  function setVolumeHandler(e: Event): void {
    const target = e.target as HTMLInputElement;
    audio.volume = Number(target.value);
  }

  function clickCardHandler(e: Event): void {
    if (audio.readyState !== 4) return;

    const targetElement = e.target as HTMLElement;
    const clickedSeasonId = targetElement.dataset.id!
    const clickedSeasonIcon = getIconElementById(clickedSeasonId);

    if (currentSeason.id !== clickedSeasonId) {
      currentSeason = data.find((i) => i.id === clickedSeasonId) ?? data[0];
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
} catch (error) {
  document.documentElement.textContent = 'ERROR!';
  console.error(error);
}
