/* eslint-disable no-underscore-dangle */
import Character from './Character';

export default class Undead extends Character {
  constructor(level, type = 'undead') {
    if (type !== 'undead') {
      throw new Error('Invalid type for undead');
    }
    super(level, type);
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
