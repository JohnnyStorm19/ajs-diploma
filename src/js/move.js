import checkActivePlayer from './checkActivePlayer';

export function moveWithSeveral(state, gamePlay, gameController, botTeam, moversArr) {
  const randomIndex = Math.floor(Math.random() * moversArr.length);
  const targetCell = moversArr[randomIndex].cellForAction;
  const moverObj = botTeam.find((char) => char.position === moversArr[randomIndex].currentCell);
  state.team.botTeam.forEach((obj) => {
    if (obj.position === moverObj.position) {
      obj.position = targetCell;
    }
  });
  gamePlay.redrawPositions([...state.team.playerTeam, ...state.team.botTeam]);
  state.currentPlayer = 'player';
  checkActivePlayer(state, gameController);
}

export function moveWithSingle(state, gamePlay, gameController, botTeam, moversArr) {
  const targetCell = moversArr[0].cellForAction;
  const moverObj = botTeam.find((char) => char.position === moversArr[0].currentCell);
  state.team.botTeam.forEach((obj) => {
    if (obj.position === moverObj.position) {
      obj.position = targetCell;
    }
  });
  gamePlay.redrawPositions([...state.team.playerTeam, ...state.team.botTeam]);
  state.currentPlayer = 'player';
  checkActivePlayer(state, gameController);
}
