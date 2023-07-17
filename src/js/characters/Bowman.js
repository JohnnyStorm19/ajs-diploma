/* eslint-disable no-underscore-dangle */
import Character from './Character';

export default class Bowman extends Character {
  constructor(level, type = 'bowman') {
    if (type !== 'bowman') {
      throw new Error('Invalid type for bowman');
    }
    super(level, type);
    this.attack = 25;
    this.defence = 25;
  }

  get _type() {
    return this.type;
  }

  set _type(value) {
    if (value !== 'bowman') {
      throw new Error('Invalid type for bowman');
    }
    this.type = value;
  }
}
