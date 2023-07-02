/* eslint-disable max-len */
import Bowman from './characters/Bowman';
import Swordsman from './characters/Swordsman';
import Magician from './characters/Magician';
import Vampire from './characters/Vampire';
import Undead from './characters/Undead';
import Daemon from './characters/Daemon';
import themes from './themes';

export default class GameState {
  constructor() {
    this.selected = {
      isSelected: false, position: null, charType: null, charTeam: null,
    }; // храним состояние выбранного персонажа, его индекс и тип
    this.team = {
      playerAllowedChars: [Bowman, Swordsman, Magician],
      botAllowedChars: [Vampire, Daemon, Undead],
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

  static from(object) {
    // TODO: create object
    return null;
  }
}
