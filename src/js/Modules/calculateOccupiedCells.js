export default function calculateOccupiedCells(botTeam, playerTeam) {
  const botCells = [];
  const playerCells = [];
  botTeam.forEach((obj) => botCells.push(obj.position));
  playerTeam.forEach((obj) => playerCells.push(obj.position));
  return [...botCells, ...playerCells];
}
