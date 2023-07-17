/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import themes from './themes';

export default class GameState {
  constructor() {
    this.selected = {
      isSelected: false, position: null, charType: null, charTeam: null,
    }; // храним состояние выбранного персонажа, его индекс и тип
    this.team = {
      playerTypes: ['magician', 'swordsman', 'bowman'],
      botTypes: ['undead', 'vampire', 'daemon'],
      playerTeam: null, // сгенерированная команда игрока
      botTeam: null, // сгенерированная команда бота
    };
    this.currentLevel = 1;
    this.currentPlayer = 'player'; // текущий ход
    this.levels = {
      1: themes.prairie,
      2: themes.desert,
      3: themes.arctic,
      4: themes.mountain,
    };
    this.mouseEnter = { // записывается индекс ячейки атаки/движения при наведении
      attack: null,
      move: null,
    }; // индекс ячейки при наведении (cellEnter)
    this.maxLevelChar = 2;
    this.maxCharsCount = 2;
    this.allowedSteps = { // доступные "шаги"
      swordsman: 4,
      undead: 4,
      bowman: 2,
      vampire: 2,
      magician: 1,
      daemon: 1,
    };
    this.allowedForAttack = { // радиус атаки
      swordsman: 1,
      undead: 1,
      bowman: 2,
      vampire: 2,
      magician: 4,
      daemon: 4,
    };
    this.borders = { // границы всего поля
      left: [],
      right: [],
    };
  }

  isUserCharacter(char) {
    return this.team.playerTypes.includes(char.type);
  }

  selectChar(gamePlay, gameState, index, type, team) {
    if (gameState.selected.isSelected) {
      gamePlay.deselectCell(gameState.selected.position);
    }
    gamePlay.selectCell(index);
    gameState.selected = {
      isSelected: true, position: index, charType: type, charTeam: team,
    };
  }

  // static from(object) {
  //   // TODO: create object
  //   this.currentState = object;
  //   return null;
  // }
}
