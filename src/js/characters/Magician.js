/* eslint-disable no-underscore-dangle */
import Character from './Character';

export default class Magician extends Character {
  constructor(level, type = 'magician') {
    if (type !== 'magician') {
      throw new Error('Invalid type for magician');
    }
    super(level, type);
    this.attack = 10;
    this.defence = 40;
  }

  get _type() {
    return this.type;
  }

  set _type(value) {
    if (value !== 'magician') {
      throw new Error('Invalid type for magician');
    }
    this.type = value;
  }
}
