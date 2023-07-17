import GamePlay from '../Services/GamePlay';
import { winGame } from './gameOver';

/* eslint-disable no-param-reassign */
export default function checkHealth(state, gameController) {
  const { botTeam } = state.team;
  const { playerTeam } = state.team;

  playerTeam.forEach((obj, index) => {
    if (obj.character.health <= 0) {
      playerTeam.splice(index, 1);
    }
  });
  botTeam.forEach((obj, index) => {
    if (obj.character.health <= 0) {
      botTeam.splice(index, 1);
    }
  });
  if (!botTeam.length) {
    if (state.currentLevel === 4) {
      GamePlay.showMessage('Победа!');
      winGame(state);
    }
    state.currentLevel += 1;
    state.maxLevelChar += 1;
    gameController.render(
      state.levels[state.currentLevel],
      state.maxLevelChar,
      state.maxCharsCount,
      gameController.playerAllowedChars,
      gameController.botAllowedChars,
    );
    state.team.playerTeam.forEach((obj) => {
      obj.character.levelUp();
    });
  }
}
