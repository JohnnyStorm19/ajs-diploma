/* eslint-disable no-console */
import { gameOver } from './gameOver';

/* eslint-disable no-param-reassign */
export default function checkActivePlayer(state, gameController, gamePlay) {
  if (state.team.playerTeam.length === 0) {
    gameOver(state);
  }
  if (state.mouseEnter.move != null) {
    gamePlay.deselectCell(state.mouseEnter.move);
  }
  state.selected = {
    isSelected: false, position: null, charType: null, charTeam: null,
  };
  if (state.currentPlayer === 'bot') {
    setTimeout(() => {
      gameController.botAction(state.team.botTeam);
    }, 3000);
  }
}
