/* eslint-disable max-len */
export default function calculateCellsForAttack(gamePlay, selectedIndex, charTypeAttackNumber) {
  const { boardSize } = gamePlay;
  const cellsForActions = [];
  const startCell = 0;
  const endCell = boardSize ** 2 - 1;
  const midCol = selectedIndex % boardSize; // столбец выбранного персонажа
  let leftCol = midCol - charTypeAttackNumber; // левая граница
  let rightCol = midCol + charTypeAttackNumber; // правая граница

  if (leftCol < 0) leftCol = 0;
  if (rightCol > (boardSize - 1)) rightCol = boardSize - 1;

  let min = selectedIndex - charTypeAttackNumber - boardSize * charTypeAttackNumber; // минимальная клетка для атаки
  if (min <= startCell) {
    min = startCell;
  }
  let max = selectedIndex + charTypeAttackNumber + boardSize * charTypeAttackNumber; // максимальная клетка для атаки
  if (max >= endCell) {
    max = endCell;
  }
  for (let i = min; i <= max; i += 1) {
    if (i % boardSize >= leftCol && i % boardSize <= rightCol && i !== selectedIndex) {
      cellsForActions.push(i);
    }
  }
  return cellsForActions;
}
