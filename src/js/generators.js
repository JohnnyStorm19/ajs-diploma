import GamePlay from './GamePlay';
import PositionedCharacter from './PositionedCharacter';

/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  // TODO: write logic here
  const randomCharType = Math.floor(Math.random() * allowedTypes.length);
  const randomLevel = Math.floor(Math.random() * maxLevel) + 1;
  yield new allowedTypes[randomCharType](randomLevel);
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей.
 * Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  const res = [];
  for (let i = 0; i < characterCount; i += 1) {
    res.push(characterGenerator(allowedTypes, maxLevel).next().value);
  }
  return res;
}

/**
 * Формирует позицию (число) в зависисмости от команды
 * @param teamSide для какой команды генерировать позицию
 * @returns возвращает позицию (число) в зависимости от команды
 */

export function generatePosition(teamSide) {
  const { boardSize } = new GamePlay();
  const positions = [];
  const start = teamSide === 'player' ? 0 : boardSize - 2;

  for (let i = start; i < boardSize ** 2; i += boardSize) {
    positions.push(i, i + 1);
  }
  return positions[Math.floor(Math.random() * positions.length)];
}

/**
 * Формирует массив объектов класса PositionedCharacter для позиционирования
 * @param teamSide для какой команды генерировать позицию
 * @param charArr массив из типов персонажей
 * @param maxLevel максимальный уровень для сгенерированных персонажей
 * @param characterCount количество персонажей в каждой из команд
 * @returns возвращает массив объектов класса PositionedCharacter
 */

export function generatePositionedCharacter(teamSide, charsArr, maxLevel, characterCount) {
  const team = generateTeam(charsArr, maxLevel, characterCount);
  const positionArr = [];
  const redrawArr = [];

  team.forEach((char, index) => {
    let position = generatePosition(teamSide);
    const isThere = positionArr.includes(position);
    while (isThere) {
      position = generatePosition(teamSide);
    }
    positionArr.push(position);
    redrawArr.push(new PositionedCharacter(char, positionArr[index]));
  });
  return redrawArr;
}
