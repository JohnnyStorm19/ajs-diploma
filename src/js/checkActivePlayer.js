export default function checkActivePlayer(state, gameController) {
  if (state.currentPlayer === 'player') {
    console.log('СМЕНИЛСЯ НА ИГРОКА');
    return;
  }
  if (state.currentPlayer === 'bot') {
    state.selected = {
      isSelected: false, position: null, charType: null, charTeam: null,
    };
    state.mouseEnter.move = null;
    state.mouseEnter.attack = null;
    console.log('СМЕНИЛСЯ НА БОТА');
    setTimeout(() => {
      gameController.botAction(state.team.botTeam);
    }, 3000);
  }
}
