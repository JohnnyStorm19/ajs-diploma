/* eslint-disable no-underscore-dangle */
import Character from '../Character';

export default class Daemon extends Character {
  constructor(level, type = 'daemon') {
    if (type !== 'daemon') {
      throw new Error('Invalid type for daemon');
    }
    super(level, type);
    this.attack = 10;
    this.defence = 10;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    if (value !== 'daemon') {
      throw new Error('Invalid type for daemon');
    }
    this._type = value;
  }
}
