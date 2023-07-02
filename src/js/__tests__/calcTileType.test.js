import { calcTileType } from '../utils';

test.each([
  [0, 8, 'top-left'],
  [5, 6, 'top-right'],
  [5, 7, 'top'],
  [8, 8, 'left'],
  [5, 4, 'center'],
  [15, 8, 'right'],
  [24, 5, 'bottom-right'],
  [20, 5, 'bottom-left'],
  [23, 5, 'bottom'],
])('testing calcTileType function with args: index - %i, boardSize - %i', (index, boardSize, expected) => {
  const res = calcTileType(index, boardSize);
  expect(res).toBe(expected);
});
