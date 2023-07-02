/* eslint-disable max-len */
import checkActivePlayer from './checkActivePlayer';

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
      }
    });
    gamePlay.redrawPositions([...state.team.playerTeam, ...state.team.botTeam]);
    state.currentPlayer = 'bot';
    checkActivePlayer(state, gameController);
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
      }
    });
    gamePlay.redrawPositions([...state.team.playerTeam, ...state.team.botTeam]);
    state.currentPlayer = 'player';
    checkActivePlayer(state, gameController);
  });
}
