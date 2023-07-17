import calculateOccupiedCells from './calculateOccupiedCells';

/* eslint-disable max-len */
export default function calculateCellsForMove(gamePlay, gameState, selectedIndex, charTypeMoveNumber, leftBorder, rightBorder) {
  const { boardSize } = gamePlay;
  const occupiedCells = calculateOccupiedCells(gameState.team.botTeam, gameState.team.playerTeam);
  const cellsForActions = [];
  const startCell = 0;
  const endCell = boardSize ** 2 - 1;
  let steps = charTypeMoveNumber;
  const moves = {
    up: selectedIndex,
    down: selectedIndex,
    left: selectedIndex,
    right: selectedIndex,
    leftUpDiagonal: selectedIndex,
    rightUpDiagonal: selectedIndex,
    leftDownDiagonal: selectedIndex,
    rightDownDiagonal: selectedIndex,
  };
  while (steps > 0) {
    // допустимые клетки для верха
    moves.up -= boardSize;
    if (moves.up >= startCell && !occupiedCells.includes(moves.up)) {
      cellsForActions.push(moves.up);
    }
    // допустимые клетки для низа
    moves.down += boardSize;
    if (moves.down <= endCell && !occupiedCells.includes(moves.down)) {
      cellsForActions.push(moves.down);
    }
    // допустимые клетки слева
    if (!leftBorder.includes(moves.left)) {
      moves.left -= 1;
      if (moves.left >= startCell && !occupiedCells.includes(moves.left)) {
        cellsForActions.push(moves.left);
      }
    }
    // допустимые клетки справа
    if (!rightBorder.includes(moves.right)) {
      moves.right += 1;
      if (moves.right <= endCell && !occupiedCells.includes(moves.right)) {
        cellsForActions.push(moves.right);
      }
    }
    // допустимые клетки левой верхней диагонали
    if (!leftBorder.includes(moves.leftUpDiagonal)) {
      moves.leftUpDiagonal -= (boardSize + 1);
      if (moves.leftUpDiagonal >= startCell && !occupiedCells.includes(moves.leftUpDiagonal)) {
        cellsForActions.push(moves.leftUpDiagonal);
      }
    }
    // допустимые клетки правой верхней диагонали
    if (!rightBorder.includes(moves.rightUpDiagonal)) {
      moves.rightUpDiagonal -= (boardSize - 1);
      if (moves.rightUpDiagonal >= startCell && !occupiedCells.includes(moves.rightUpDiagonal)) {
        cellsForActions.push(moves.rightUpDiagonal);
      }
    }
    // допустимые клетки левой нижней диагонали
    if (!leftBorder.includes(moves.leftDownDiagonal)) {
      moves.leftDownDiagonal += (boardSize - 1);
      if (moves.leftDownDiagonal <= endCell && !occupiedCells.includes(moves.leftDownDiagonal)) {
        cellsForActions.push(moves.leftDownDiagonal);
      }
    }
    // допустимые клетки правой нижней диагонали
    if (!rightBorder.includes(moves.rightDownDiagonal)) {
      moves.rightDownDiagonal += (boardSize + 1);
      if (moves.rightDownDiagonal <= endCell && !occupiedCells.includes(moves.rightDownDiagonal)) {
        cellsForActions.push(moves.rightDownDiagonal);
      }
    }
    steps -= 1;
  }
  return cellsForActions;
}
