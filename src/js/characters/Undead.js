/* eslint-disable no-underscore-dangle */
import Character from '../Character';

export default class Undead extends Character {
  constructor(level, type = 'undead') {
    if (type !== 'undead') {
      throw new Error('Invalid type for undead');
    }
    super(level, type);
    this.attack = 40;
    this.defence = 10;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    if (value !== 'undead') {
      throw new Error('Invalid type for undead');
    }
    this._type = value;
  }
}
