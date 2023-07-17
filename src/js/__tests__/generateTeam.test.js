import Bowman from '../characters/Bowman';
import Magician from '../characters/Magician';
import Swordsman from '../characters/Swordsman';
import { generateTeam } from '../Modules/generators';

test('team generation works properly', () => {
  const types = [Bowman, Magician, Swordsman];
  const level = 3;
  const charsNumber = 3;
  const team1 = generateTeam(types, level, charsNumber);

  expect(team1.length).toBe(charsNumber);
});

test('char level is appropriate', () => {
  const types = [Bowman, Magician, Swordsman];
  const level = 3;
  const charsNumber = 3;
  const team1 = generateTeam(types, level, charsNumber);

  const levels = [];
  team1.forEach((char) => {
    levels.push(char.level);
  });
  expect(levels.every((num) => num <= level)).toBeTruthy();
});
