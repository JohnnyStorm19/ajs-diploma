/* eslint-disable no-underscore-dangle */
import Character from '../Character';

export default class Vampire extends Character {
  constructor(level, type = 'vampire') {
    if (type !== 'vampire') {
      throw new Error('Invalid type for vampire');
    }
    super(level, type);
    this.attack = 25;
    this.defence = 25;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    if (value !== 'vampire') {
      throw new Error('Invalid type for vampire');
    }
    this._type = value;
  }
}
