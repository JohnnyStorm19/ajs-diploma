/* eslint-disable no-underscore-dangle */
import Character from './Character';

export default class Daemon extends Character {
  constructor(level) {
    super(level, 'daemon');
    this.attack = 10;
    this.defence = 10;
  }

  get _type() {
    return this.type;
  }

  set _type(value) {
    if (value !== 'daemon') {
      throw new Error('Invalid type for daemon');
    }
    this.type = value;
  }
}
