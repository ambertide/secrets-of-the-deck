import card0 from './images/0.png';
import card1 from './images/1.png';
import card2 from './images/2.png';
import card3 from './images/3.png';
import card4 from './images/4.png';
import card5 from './images/5.png';
import card6 from './images/6.png';
import card7 from './images/7.png';
import card8 from './images/8.png';
import card9 from './images/9.png';
import card10 from './images/10.png';
import card11 from './images/11.png';
import card12 from './images/12.png';
import card13 from './images/13.png';
import card14 from './images/14.png';
import card15 from './images/15.png';
import card16 from './images/16.png';
import card17 from './images/17.png';
import card18 from './images/18.png';
import card19 from './images/19.png';
import card20 from './images/20.png';
import card21 from './images/21.png';
import cardBack from './images/CardBacks.png';

const images = [
  card0,
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  card7,
  card8,
  card9,
  card10,
  card11,
  card12,
  card13,
  card14,
  card15,
  card16,
  card17,
  card18,
  card19,
  card20,
  card21,
  cardBack
];

export const resolveImage = (index: number, backwards: boolean) => backwards ? images[22] : images[index];