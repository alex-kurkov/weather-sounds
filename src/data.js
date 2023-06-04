import rainSound from 'sounds/rain.mp3';
import rainImage from 'images/rainy-bg.jpg';
import rainIcon from 'icons/cloud-rain.svg';

import sunSound from 'sounds/summer.mp3';
import sunImage from 'images/summer-bg.jpg';
import sunIcon from 'icons/sun.svg';

import snowSound from 'sounds/winter.mp3';
import snowImage from 'images/winter-bg.jpg';
import snowIcon from 'icons/cloud-snow.svg';

export default [
  {
    id: 'sun',
    sound: sunSound,
    image: `url(${sunImage}`,
    icon: `url(${sunIcon}`,
  },
  {
    id: 'rain',
    sound: rainSound,
    image: `url(${rainImage}`,
    icon: `url(${rainIcon}`,
  },
  {
    id: 'snow',
    sound: snowSound,
    image: `url(${snowImage}`,
    icon: `url(${snowIcon}`,
  },
];
