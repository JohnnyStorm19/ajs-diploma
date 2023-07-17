/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import GamePlay from './GamePlay';
import GameState from '../Modules/GameState';
import { generatePosition, generatePositionedCharacter } from '../Modules/generators';
import cursors from '../Modules/cursors';
import calculateCellsForMove from '../Modules/calculateCellsForMove';
import calculateCellsForAttack from '../Modules/calculateCellsForAttack';
import BotActionLogic from './BotActionLogic';
import checkActivePlayer from '../Modules/checkActivePlayer';
import checkHealth from '../Modules/checkHealth';
import reloadState from '../Modules/reloadState';
import GameStateService from './GameStateService';
import PositionedCharacter from '../Modules/PositionedCharacter';
import CharacterLoaded from '../characters/CharacterLoaded';
import Bowman from '../characters/Bowman';
import Magician from '../characters/Magician';
import Swordsman from '../characters/Swordsman';
import Undead from '../characters/Undead';
import Vampire from '../characters/Vampire';
import Daemon from '../characters/Daemon';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.state = new GameState();
    this.gameStateService = new GameStateService(localStorage);
    this.playerAllowedChars = [Bowman, Magician, Swordsman];
    this.botAllowedChars = [Undead, Vampire, Daemon];
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService

    // Задача #1.1 - Отрисовываем поле
    this.render(
      this.state.levels[this.state.currentLevel],
      this.state.maxLevelChar,
      this.state.maxCharsCount,
      this.playerAllowedChars,
      this.botAllowedChars,
    );
    this.addListenerFuncs();
    console.log(this.state);
  }

  render(level, maxLevelChar, characterCount, playerAllowedChars, botTeamAllowedChars) {
    let playerRender = null;
    if (this.state.currentLevel === 1) {
      playerRender = generatePositionedCharacter('player', playerAllowedChars, maxLevelChar, characterCount);
    } else {
      const currentRandomPositions = []; // массив рандомных позиций, чтобы исключить повторы
      playerRender = this.state.team.playerTeam;
      this.state.team.playerTeam.forEach((obj) => {
        const position = generatePosition('player');
        if (!currentRandomPositions.includes(position)) {
          currentRandomPositions.push(position);
          obj.position = position;
        }
      });
    }
    this.gamePlay.drawUi(level);
    const botRender = generatePositionedCharacter('bot', botTeamAllowedChars, maxLevelChar, characterCount);
    this.state.team.playerTeam = [...playerRender];
    this.state.team.botTeam = [...botRender];
    this.gamePlay.redrawPositions([...playerRender, ...botRender]);
    this.calculateFieldBorders(this.gamePlay.boardSize);
  }

  /**
 * Метод определяет поведение персонажа бота
 * Выбирается ячейка для бота, в зависимости от возможности - он либо идет, либо атакует
 * Атака:
 * - если есть возможность, то персонаж всегда атакует
 * - при возможности атаки у нескольких персонажей - атакуют в таком порядке (undead, vampire, daemon)
 * У undead сильнее всех атака, соответственно атакует в первую очередь он.
 * Движение:
 * - движение происходит в таком порядке (undead, vampire, daemon)
 * Так как у undead сильнее всего атака, ему нужно как можно скорее сблизиться для атаки
 *
 * После действия меняется ход
 * @param botTeam принимает массив из инстансов класса Positioned Character из this.state.team.botTeam
 * this.state.team.botTeam = [PositionedCharacter, PositionedCharacter] -----> PositionedCharacter = {character: Vampire{...}, position: 22}
 * @returns возвращает действие и переключает активного игрока
 */
  botAction(botTeam) {
    const botLogic = new BotActionLogic(this.state.team.playerTeam, botTeam, this.state.borders.left, this.state.borders.right, this.state, this.gamePlay, this);
    botLogic.calculatePositions();
    botLogic.addPositionsToProps();
    const isAttack = botLogic.checkForAttack();

    if (isAttack) {
      botLogic.attack();
    }
    if (!isAttack) {
      botLogic.checkForMove();
      botLogic.move();
    }
    console.log('после преобразования', botTeam);
    console.log('botLogicInstance: ', botLogic);
  }

  onCellClick(index) {
    if (this.state.currentPlayer !== 'player') {
      return;
    }
    const findedChar = this.findChar(index);
    if (findedChar) {
      const isUserCharacter = this.state.isUserCharacter(findedChar);
      console.log(isUserCharacter);
      if (isUserCharacter) {
        this.state.selectChar(this.gamePlay, this.state, index, findedChar.type, findedChar.team);
        return;
      }
      if (this.state.selected.isSelected && !isUserCharacter) {
        this.playerAttack(index);
        return;
      }
      GamePlay.showMessage('Выбран персонаж противника');
      return;
    }
    if (this.state.selected.isSelected) {
      this.playerMove();
      return;
    }
    GamePlay.showMessage('Выбрана пустая ячейка');
  }

  onCellEnter(index) {
    const finded = this.findChar(index); // ищем в ячейке персонажа
    if (finded) {
      const {
        level, attack, defence, health,
      } = finded;
      const message = `${String.fromCodePoint(0x0001F396)}${level} ${String.fromCodePoint(0x00002694)}${attack} ${String.fromCodePoint(0x0001F6E1)}${defence} ${String.fromCodePoint(0x00002764)}${health}`;
      this.gamePlay.showCellTooltip(message, index);
    }
    if (this.state.currentPlayer === 'bot') {
      return;
    }
    this.cellEnterFunc(index);
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
    if (!this.state.selected.isSelected) { // если нет выбранного персонажа
      this.gamePlay.setCursor(cursors.auto);
    }
    if (this.state.mouseEnter.move != null) { // если навели на клетку, и она доступна для движения
      this.gamePlay.deselectCell(this.state.mouseEnter.move);
    }
    if (this.state.mouseEnter.attack != null) { // если навели на клетку, и она доступна для атаки
      this.gamePlay.deselectCell(this.state.mouseEnter.attack);
    }
    this.state.mouseEnter.move = null;
    this.state.mouseEnter.attack = null;
  }

  addListenerFuncs() {
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));

    this.gamePlay.addNewGameListener(this.onNewGameClick.bind(this));
    this.gamePlay.addSaveGameListener(this.onSaveGameClick.bind(this));
    this.gamePlay.addLoadGameListener(this.onLoadGameClick.bind(this));
  }

  onNewGameClick() {
    localStorage.clear();
    reloadState(this.state);
    this.render(
      this.state.levels[this.state.currentLevel],
      this.state.maxLevelChar,
      this.state.maxCharsCount,
      this.playerAllowedChars,
      this.botAllowedChars,
    );
  }

  onSaveGameClick() {
    GamePlay.showMessage('Данные успешно сохранены!');
    localStorage.clear();
    this.gameStateService.save(this.state);
  }

  onLoadGameClick() {
    if (!localStorage.getItem('state')) {
      GamePlay.showMessage('Сохранения не найдены!');
      return;
    }
    GamePlay.showMessage('Игра успешно загружена!');
    const state = this.gameStateService.load();
    console.log('before', state, this.state);

    state.team.playerTeam.map((obj) => {
      obj.character = new CharacterLoaded(obj.character, obj.character.level);
      obj = new PositionedCharacter(obj.character, obj.position);
      return obj;
    });
    state.team.botTeam.map((obj) => {
      obj.character = new CharacterLoaded(obj.character, obj.character.level);
      obj = new PositionedCharacter(obj.character, obj.position);
      return obj;
    });

    this.state.selected = state.selected;
    this.state.team = state.team;
    this.state.currentLevel = state.currentLevel;

    this.gamePlay.drawUi(this.state.levels[this.state.currentLevel]);
    this.gamePlay.redrawPositions([...this.state.team.playerTeam, ...this.state.team.botTeam]);
    console.log('after', state, this.state);
  }

  /**
 * Функция ищет инстанс класса одного из персонажей среди сгенерированных по индексу
 * @param index индекс клетки, на которой может быть персонаж
 * @returns возвращает инстанс класса одного из персонажей на клетке
 */

  findChar(index) {
    let res;
    const values = [...this.state.team.playerTeam, ...this.state.team.botTeam];
    values.forEach((char) => {
      if (char.position === index) {
        if (this.state.team.playerTypes.includes(char.character.type)) {
          char.character.team = 'player';
        }
        res = char.character;
      }
    });
    return res;
  }

  /**
 * Функция проверяет клетку на возможность действия (атака/движение)
 * @param action действие, на которое проверяем - 'attack' или 'move'
 * @param currentIndex индекс клетки, которую проверяем по отношению к выбранному персонажу
 * @returns возвращает булево значение
 */
  checkAreaForActions(action, currentIndex) {
    const selectedChar = this.findChar(this.state.selected.position);
    const { position: selectedCharIndex } = this.state.selected;
    const { type } = selectedChar;
    if (action === 'move') {
      const allowedSteps = this.state.allowedSteps[type];
      const cellsForMoving = calculateCellsForMove(this.gamePlay, this.state, selectedCharIndex, allowedSteps, this.state.borders.left, this.state.borders.right);
      if (cellsForMoving.includes(currentIndex)) {
        return true;
      }
    }
    if (action === 'attack') {
      const allowedForAttack = this.state.allowedForAttack[type];
      const cellsForAttack = calculateCellsForAttack(this.gamePlay, selectedCharIndex, allowedForAttack);
      if (cellsForAttack.includes(currentIndex)) {
        return true;
      }
      console.log('CELLS FOR ATTACK', cellsForAttack);
    }
    return false;
  }

  /**
 * Рассчитываем индексы левой и правой границ поля
  сохраняем в инстанс GameState в свойство borders
 * @param rowSize количество рядов, соответственно boardSize, т.к. поле квадратное
 * @returns ничего не возвращает. В соответствующие свойства пушатся результаты.
 */
  calculateFieldBorders(rowSize) {
    for (let i = 0; i < rowSize ** 2; i += rowSize) {
      this.state.borders.left.push(i);
      this.state.borders.right.push(i + (rowSize - 1));
    }
  }

  playerAttack(index) {
    const isAllowedForAttack = this.state.mouseEnter.attack; // смотрим записан ли в this.state.mouseEnter.attack индекс
    const currentChar = this.findChar(this.state.selected.position); // находим текущего активного персонажа
    if (isAllowedForAttack != null) {
      const botChar = this.findChar(index);
      const damage = Math.max(currentChar.attack - botChar.defence, currentChar.attack * 0.1);
      this.gamePlay.showDamage(index, damage).then(() => {
        this.state.team.botTeam.forEach((obj) => {
          if (obj.position === index) {
            obj.character.health -= damage;
            Number(obj.character.health.toFixed(1));
            checkHealth(this.state, this);
          }
        });
        this.gamePlay.redrawPositions([...this.state.team.playerTeam, ...this.state.team.botTeam]);
        this.gamePlay.deselectCell(this.state.selected.position);
        console.log(this.state);
        this.state.currentPlayer = 'bot';
        checkActivePlayer(this.state, this, this.gamePlay);
      });
    }
  }

  playerMove() {
    const isAllowedForMove = this.state.mouseEnter.move;
    if (isAllowedForMove != null) {
      this.state.team.playerTeam.forEach((char) => {
        if (char.position === this.state.selected.position) {
          char.position = this.state.mouseEnter.move;
          this.gamePlay.deselectCell(this.state.selected.position);
          this.state.selected.position = this.state.mouseEnter.move;
        }
      });
      this.gamePlay.redrawPositions([...this.state.team.playerTeam, ...this.state.team.botTeam]);
      this.gamePlay.deselectCell(this.state.mouseEnter.move);
      console.log('Сработало движение!!!');
      console.log(this.state.team.playerTeam);
      console.log(this.state.mouseEnter);
    } else {
      return;
    }
    this.state.currentPlayer = 'bot';
    checkActivePlayer(this.state, this, this.gamePlay);
  }

  cellEnterFunc(index) {
    const finded = this.findChar(index); // ищем в ячейке персонажа
    const { isSelected } = this.state.selected || null; // выбран ли персонаж
    if (finded && isSelected) {
      const { team } = finded;
      // если навели на персонаж игрока, то выставляем курсор
      if (this.state.selected.charTeam === team) {
        this.gamePlay.setCursor(cursors.pointer);
        return;
      }
      // если навели на персонажа бота
      if (this.state.selected.charTeam !== team) {
        const isAllowedForAttack = this.checkAreaForActions('attack', index); // проверяем клетку на доступность для атаки
        if (isAllowedForAttack) {
          if (this.state.mouseEnter.attack !== null) {
            this.gamePlay.deselectCell(this.state.mouseEnter.attack);
          }
          this.gamePlay.selectCell(index, 'red');
          this.state.mouseEnter.attack = index;
          this.gamePlay.setCursor(cursors.crosshair);
          return;
        }
        this.gamePlay.setCursor(cursors.notallowed);
      }
    }
    if (!finded && isSelected) { // если ячейка пустая, но персонаж выбран (ходим)
      const isAllowedForMove = this.checkAreaForActions('move', index);
      if (isAllowedForMove && this.state.mouseEnter.move === null) {
        this.gamePlay.selectCell(index, 'green');
        this.state.mouseEnter.move = index;
        this.gamePlay.setCursor(cursors.pointer);
        return;
      }
      if (isAllowedForMove && this.state.mouseEnter.move != null) {
        this.gamePlay.deselectCell(this.state.mouseEnter.move);
        this.gamePlay.selectCell(index, 'green');
        this.state.mouseEnter.move = index;
        this.gamePlay.setCursor(cursors.pointer);
        return;
      }
      this.gamePlay.setCursor(cursors.notallowed);
    }
  }
}
