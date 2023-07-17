/* eslint-disable no-param-reassign */
export default function reloadState(state) {
  state.team.botTeam = [];
  state.team.playerTeam = [];
  state.selected = {
    isSelected: false, position: null, charType: null, charTeam: null,
  };
  state.currentLevel = 1;
  state.mouseEnter = { // записывается индекс ячейки атаки/движения при наведении
    attack: null,
    move: null,
  };
  state.maxLevelChar = 2;
  state.borders = { // границы всего поля
    left: [],
    right: [],
  };
}
