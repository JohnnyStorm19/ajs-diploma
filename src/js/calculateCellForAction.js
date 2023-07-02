/* eslint-disable max-len */
/**
 * Функция определяет клетку для движения персонажа бота
 * Клетка выбирается на основании позиции персонажа игрока (бот подбирается настолько близко, насколько возможно для атаки)
 * Клетка записывается в info.cellForAction
 * @param botCharacter принимает инстанс класса Positioned Character со свойством character (botTeam[i].character)
 * @param playerTeam принимает массив инстансов класса Positioned Character со свойством character (playerTeamTeam[i] (свойства character и position));
 * @param currentBotCell текущая позиция персонажа бота
 * @param gamePlay свойство this.gamePlay
 * @param gameState свойство this.state
 * @returns void. Клетка для действия записывается в info.cellForAction
 */

export default function calculateCellforAction(botCharacter, playerTeam, gamePlay, gameState) {
  let resHorizontal = Infinity;
  let resVertical = Infinity;
  let cellForMove; // клетка для передвижения
  for (let i = 0; i < botCharacter.moveCells.length; i += 1) {
    const cell = botCharacter.moveCells[i];
    const cellAxisHorizontal = cell % gamePlay.boardSize;
    const cellAxisVertical = Math.floor(cell / gamePlay.boardSize);

    for (let j = 0; j < playerTeam.length; j += 1) {
      const playerHorizontal = playerTeam[j].character.axisHorizontal;
      const playerVertical = playerTeam[j].character.axisVertical;
      const { type } = botCharacter;

      const radiusAttack = gameState.allowedForAttack[type];

      const tempDiffHorizontal = Math.abs(cellAxisHorizontal - playerHorizontal);
      const tempDiffVertical = Math.abs(cellAxisVertical - playerVertical);

      let tempResHorizontal = tempDiffHorizontal - radiusAttack;
      if (tempResHorizontal < 0) tempResHorizontal = 0;
      let tempResVertical = tempDiffVertical - radiusAttack;
      if (tempResVertical < 0) tempResVertical = 0;

      if (tempResHorizontal <= resHorizontal && tempResVertical <= resVertical) {
        resHorizontal = tempResHorizontal;
        resVertical = tempResVertical;
        cellForMove = cell;
      }
      if (tempResHorizontal > resHorizontal || tempResVertical > resVertical) {
        const tempSum = tempResHorizontal + tempResVertical;
        const resSum = resHorizontal + resVertical;
        if (tempSum <= resSum) {
          resHorizontal = tempResHorizontal;
          resVertical = tempResVertical;
          cellForMove = cell;
        }
      }
    }
  }
  return cellForMove;
}
