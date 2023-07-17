/* eslint-disable no-underscore-dangle */
import Character from './Character';

export default class Swordsman extends Character {
  constructor(level, type = 'swordsman') {
    if (type !== 'swordsman') {
      throw new Error('Invalid type for swordsman');
    }
    super(level, type);
    this.attack = 40;
    this.defence = 10;
  }

  get _type() {
    return this.type;
  }

  set _type(value) {
    if (value !== 'swordsman') {
      throw new Error('Invalid type for swordsman');
    }
    this.type = value;
  }
}
