import Character from './Character';

export default class CharacterLoaded extends Character {
  constructor(object, level) {
    super(level);
    this.level = level;
    this.type = object.type;
    this.attack = object.attack;
    this.defence = object.defence;
    this.health = object.health;
    this.axisHorizontal = object.axisHorizontal;
    this.axisVertical = object.axisVertical;
  }
}
