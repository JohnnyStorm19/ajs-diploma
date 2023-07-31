/* eslint-disable no-underscore-dangle */
import Character from './Character';

export default class Undead extends Character {
  constructor(level) {
    super(level, 'undead');
    this.attack = 40;
    this.defence = 10;
  }

  get _type() {
    return this.type;
  }

  set _type(value) {
    if (value !== 'undead') {
      throw new Error('Invalid type for undead');
    }
    this.type = value;
  }
}
