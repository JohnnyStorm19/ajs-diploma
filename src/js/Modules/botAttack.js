/* eslint-disable no-param-reassign */
/* eslint-disable max-len */

/**
 * Функция определяет атаку персонажа бота
 * Параметры функции:
 * @param state принимает текущее состояние игры
 * @param gamePlay принимает текущее свойство gamePlay
 * @param gameController принимает текущее свойство gameController
 * @param playerTeam массив из инстансов класса PositionedCharacter (character, position), т.е текущая команда игрока
 * @param botTeam массив из инстансов класса PositionedCharacter (character, position), т.е текущая команда бота
 * @param attackersArr массив из персонажей бота, которые могут атаковать в данный момент
 */

import GamePlay from '../Services/GamePlay';
import checkActivePlayer from './checkActivePlayer';
import checkHealth from './checkHealth';

export function attackWithSeveral(state, gamePlay, gameController, playerTeam, botTeam, attackersArr) {
  const randomIndex = Math.floor(Math.random() * attackersArr.length);
  const targetCell = attackersArr[randomIndex].cellForAction;
  const targetObj = playerTeam.find((char) => char.position === targetCell);
  const attackerObj = botTeam.find((char) => char.position === attackersArr[randomIndex].currentCell);
  const damage = Math.max(attackerObj.character.attack - targetObj.character.defence, attackerObj.character.attack * 0.1);
  gamePlay.showDamage(targetObj.position, damage).then(() => {
    state.team.playerTeam.forEach((obj) => {
      if (obj.position === targetObj.position) {
        obj.character.health -= damage;
        Number(obj.character.health.toFixed(1));
        checkHealth(state, gameController);
      }
    });
    gamePlay.redrawPositions([...state.team.playerTeam, ...state.team.botTeam]);
    state.currentPlayer = 'player';
    GamePlay.showMessage('Ход игрока');
    checkActivePlayer(state, gameController, gamePlay);
  });
}

export function attackWithSingle(state, gamePlay, gameController, playerTeam, botTeam, attackersArr) {
  const targetCell = attackersArr[0].cellForAction;
  const targetObj = playerTeam.find((char) => char.position === targetCell);
  const attackerObj = botTeam.find((char) => char.position === attackersArr[0].currentCell);
  const damage = Math.max(attackerObj.character.attack - targetObj.character.defence, attackerObj.character.attack * 0.1);
  gamePlay.showDamage(targetObj.position, damage).then(() => {
    state.team.playerTeam.forEach((obj) => {
      if (obj.position === targetObj.position) {
        obj.character.health -= damage;
        Number(obj.character.health.toFixed(1));
        checkHealth(state, gameController);
      }
    });
    gamePlay.redrawPositions([...state.team.playerTeam, ...state.team.botTeam]);
    state.currentPlayer = 'player';
    checkActivePlayer(state, gameController, gamePlay);
  });
}
