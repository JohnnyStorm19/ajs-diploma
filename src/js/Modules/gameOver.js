import GamePlay from '../Services/GamePlay';
import reloadState from './reloadState';

/* eslint-disable no-param-reassign */
export function gameOver(state) {
  state.currentPlayer = 'bot'; // тем самым блокирую нажатия и наведение на клетку
  GamePlay.showMessage('Персонажи игрока повержены!');
  GamePlay.showMessage('Если хотите испытать себя вновь начните новую игру (New Game)');
}

export function winGame(state) {
  state.currentPlayer = 'bot'; // тем самым блокирую нажатия и наведение на клетку
  GamePlay.showMessage('Вражеские герои повержены!');
  reloadState(state);
  window.location.reload();
}
