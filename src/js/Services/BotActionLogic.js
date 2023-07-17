/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { attackWithSeveral, attackWithSingle } from '../Modules/botAttack';

import calculateCellsForAttack from '../Modules/calculateCellsForAttack';
import calculateCellsForMove from '../Modules/calculateCellsForMove';
import calculateCellForAction from '../Modules/calculateCellForAction';

import { moveWithSeveral, moveWithSingle } from '../Modules/botMove';

/**
 * Класс определяет поведение персонажа бота
 * Параметры конструктора класса:
 * @param playerTeam принимает массив из инстансов класса Positioned Character из this.state.team.playerTeam
 * @param botTeam принимает массив из инстансов класса Positioned Character из this.state.team.botTeam
 * @param leftBorder массив из индексов левой границы поля
 * @param rightBorder массив из индексов правой границы поля
 * @param gameState текущий инстанс класса GameState
 * @param gamePlay текущий инстанс класса GamePlay
 * @param gameController текущий инстанс класса GameController
 */

export default class BotActionLogic {
  constructor(playerTeam, botTeam, leftBorder, rightBorder, gameState, gamePlay, gameController) {
    this.playerTeam = playerTeam;
    this.playerPositions = [];
    this.botPositions = [];
    this.botTeam = botTeam;
    this.leftBorder = leftBorder;
    this.rightBorder = rightBorder;
    this.state = gameState;
    this.gamePlay = gamePlay;
    this.gameController = gameController;
    this.arrOfAttackers = []; // массив с персонажами бота, которые могут атаковать
    this.arrOfMovers = []; // массив с персонажами бота, которые могут ходить
  }

  /**
 * Метод работает с позициями персонажей
 */
  calculatePositions() {
    // В свойство playerPositions пушим текущие позиции персонажей игрока, для удобства работы с ними внутри метода
    this.playerTeam.forEach((obj) => {
      this.playerPositions.push(obj.position);
    });
    this.botTeam.forEach((obj) => {
      const allowedSteps = this.state.allowedSteps[obj.character.type]; // радиус движение
      const allowedForAttack = this.state.allowedForAttack[obj.character.type]; // радиус атаки
      // в соответствующие свойства каждого персонажа бота записываем индексы клеток и добавляем свойство info
      obj.character.moveCells = calculateCellsForMove(this.gamePlay, this.state, obj.position, allowedSteps, this.leftBorder, this.rightBorder);
      obj.character.attackCells = calculateCellsForAttack(this.gamePlay, obj.position, allowedForAttack);
      obj.character.info = [];
      this.gamePlay.deselectCell(obj.position);
      this.botPositions.push(obj.position);
    });
  }
  /**
 * Метод работает с позициями персонажей и добавляет их в сооветствеющие свойства
 */

  addPositionsToProps() {
    this.playerPositions.forEach((position) => {
      const playerObj = this.playerTeam.find((obj) => obj.position === position);
      playerObj.character.axisHorizontal = position % this.gamePlay.boardSize; // считаем горизонтальную ось и записываем в соответствующее свойство
      playerObj.character.axisVertical = Math.floor(position / this.gamePlay.boardSize); // считаем вертикальную ось и записываем в соответствующее свойство

      for (let i = 0; i < this.botTeam.length; i += 1) {
        const toInfo = { action: null, cellForAction: null }; // формируем объект для дальнейшего пуша в свойство info
        this.botTeam[i].character.axisHorizontal = this.botTeam[i].position % this.gamePlay.boardSize; // // считаем горизонтальную ось и записываем в соответствующее свойство
        this.botTeam[i].character.axisVertical = Math.floor(this.botTeam[i].position / this.gamePlay.boardSize); // // считаем вертикальную ось и записываем в соответствующее свойство
        // если есть клетки для атаки
        if (this.botTeam[i].character.attackCells.includes(position)) {
          toInfo.action = 'attack';
          toInfo.cellForAction = position;
          toInfo.currentCell = this.botTeam[i].position;
          toInfo.currentType = this.botTeam[i].character.type;
        }
        // если клеток для атаки нет
        if (!this.botTeam[i].character.attackCells.includes(position)) {
          toInfo.action = 'move';
          toInfo.currentCell = this.botTeam[i].position;
          toInfo.currentType = this.botTeam[i].character.type;
          // определяем клетку оптимальную клетку для движения с помощью функции calculateCellforAction
          toInfo.cellForAction = calculateCellForAction(this.botTeam[i].character, this.playerTeam, this.gamePlay, this.state);
        }
        this.botTeam[i].character.info.push(toInfo);
      }
    });
  }

  checkForAttack() {
    const attackers = [];
    this.botTeam.forEach((char) => {
      const findedAttacker = char.character.info.find((obj) => obj.action === 'attack');
      if (findedAttacker) attackers.push(findedAttacker);
    });
    attackers.forEach((obj) => this.arrOfAttackers.push(obj));
    return !!this.arrOfAttackers.length;
  }

  checkForMove() {
    const movers = [];
    this.botTeam.forEach((char) => {
      const findedMover = char.character.info.find((obj) => obj.action === 'move');
      if (findedMover) movers.push(findedMover);
    });
    movers.forEach((obj) => this.arrOfMovers.push(obj));
    return !!this.arrOfMovers.length;
  }

  attack() {
    const undeadAttackers = this.arrOfAttackers.filter((obj) => obj.currentType === 'undead');
    const vampireAttackers = this.arrOfAttackers.filter((obj) => obj.currentType === 'vampire');
    const daemonAttackers = this.arrOfAttackers.filter((obj) => obj.currentType === 'daemon');

    console.log('АТАКА!!!');
    console.log('Те, кто атакуют: ', this.arrOfAttackers);
    console.log(undeadAttackers, vampireAttackers, daemonAttackers);

    // начинаем проверять массив с атакующими персонажами с андедов и т.д.
    // если андедов больше 1, тогда используем функцию, которая определит каким атаковать
    if (undeadAttackers.length > 1) {
      attackWithSeveral(this.state, this.gamePlay, this.gameController, this.playerTeam, this.botTeam, undeadAttackers);
    }
    // если андед 1, тогда он атакует
    if (undeadAttackers.length === 1) {
      attackWithSingle(this.state, this.gamePlay, this.gameController, this.playerTeam, this.botTeam, undeadAttackers);
      return;
    }

    if (vampireAttackers.length > 1) {
      attackWithSeveral(this.state, this.gamePlay, this.gameController, this.playerTeam, this.botTeam, vampireAttackers);
    }
    if (vampireAttackers.length === 1) {
      attackWithSingle(this.state, this.gamePlay, this.gameController, this.playerTeam, this.botTeam, vampireAttackers);
    }

    if (daemonAttackers.length > 1) {
      attackWithSeveral(this.state, this.gamePlay, this.gameController, this.playerTeam, this.botTeam, daemonAttackers);
    }
    if (daemonAttackers.length === 1) {
      attackWithSingle(this.state, this.gamePlay, this.gameController, this.playerTeam, this.botTeam, daemonAttackers);
    }
  }

  move() {
    const undeadMovers = this.arrOfMovers.filter((obj) => obj.currentType === 'undead');
    const vampireMovers = this.arrOfMovers.filter((obj) => obj.currentType === 'vampire');
    const daemonMovers = this.arrOfMovers.filter((obj) => obj.currentType === 'daemon');

    console.log('ХОДИМ!!!');
    console.log('Те, кто ходят: ', this.arrOfMovers);
    console.log(undeadMovers, vampireMovers, daemonMovers);

    if (undeadMovers.length === 1) {
      moveWithSingle(this.state, this.gamePlay, this.gameController, this.botTeam, undeadMovers);
      return;
    }
    if (undeadMovers.length > 1) {
      moveWithSeveral(this.state, this.gamePlay, this.gameController, this.botTeam, undeadMovers);
    }

    if (vampireMovers.length === 1) {
      moveWithSingle(this.state, this.gamePlay, this.gameController, this.botTeam, vampireMovers);
      return;
    }
    if (vampireMovers.length > 1) {
      moveWithSeveral(this.state, this.gamePlay, this.gameController, this.botTeam, vampireMovers);
    }

    if (daemonMovers.length === 1) {
      moveWithSingle(this.state, this.gamePlay, this.gameController, this.botTeam, daemonMovers);
      return;
    }
    if (daemonMovers.length > 1) {
      moveWithSeveral(this.state, this.gamePlay, this.gameController, this.botTeam, daemonMovers);
    }
  }
}
