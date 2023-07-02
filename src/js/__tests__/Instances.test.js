/* eslint-disable no-unused-vars */
import Character from '../Character';
import Bowman from '../characters/Bowman';
import Swordsman from '../characters/Swordsman';
import Magician from '../characters/Magician';
import Vampire from '../characters/Vampire';
import Daemon from '../characters/Daemon';
import Undead from '../characters/Undead';

test('Throwing an error when Character.js initialized as instance', () => {
  expect(() => {
    const char = new Character(1);
  }).toThrow('Base class cannot be the instance');
});
test('Creating instances with right properties', () => {
  const robin = new Bowman(1);
  const arthur = new Swordsman(1);
  const stiven = new Magician(1);
  const edward = new Vampire(1);
  const lilith = new Daemon(1);
  const shawn = new Undead(1);
  expect(robin).toEqual({
    level: 1, attack: 25, defence: 25, health: 100, type: 'bowman',
  });
  expect(arthur).toEqual({
    level: 1, attack: 40, defence: 10, health: 100, type: 'swordsman',
  });
  expect(stiven).toEqual({
    level: 1, attack: 10, defence: 40, health: 100, type: 'magician',
  });
  expect(edward).toEqual({
    level: 1, attack: 25, defence: 25, health: 100, type: 'vampire',
  });
  expect(lilith).toEqual({
    level: 1, attack: 10, defence: 10, health: 100, type: 'daemon',
  });
  expect(shawn).toEqual({
    level: 1, attack: 40, defence: 10, health: 100, type: 'undead',
  });
});
