/* eslint-disable no-underscore-dangle */
/* eslint-disable no-mixed-operators */
/* eslint-disable max-len */
/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */
export default class Character {
  constructor(level, type = 'generic') {
    if (new.target.name === 'Character') {
      throw new Error('Base class cannot be the instance');
    }
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 100;
    this._type = type;
    // TODO: выбросите исключение, если кто-то использует "new Character()"
  }

  levelUp() {
    const attackAfter = Math.max(this.attack, this.attack * (80 + this.health) / 100);
    const defenceAfter = Math.max(this.defence, this.defence * (80 + this.health) / 100);
    this.attack = Math.round(attackAfter);
    this.defence = Math.round(defenceAfter);

    if (this.health !== 100) {
      this.health += 80;
    }
    if (this.health > 100) this.health = 100;
    this.level += 1;
  }
}
