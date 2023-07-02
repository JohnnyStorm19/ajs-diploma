import Bowman from '../characters/Bowman';
import Magician from '../characters/Magician';
import Swordsman from '../characters/Swordsman';
import { characterGenerator } from '../generators';

test('generator func is working properly', () => {
  const types = [Swordsman, Magician, Bowman];
  const level = 2;

  expect(characterGenerator(types, level).next().done).toBeFalsy();
  expect(characterGenerator(types, level).next().done).toBeFalsy();
  expect(characterGenerator(types, level).next().done).toBeFalsy();
});
