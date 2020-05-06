class Player {
  inventory = {};
  name = "scrub";
  hp = 20;
  maxHp = 20;
  gold = 0;

  addToInventory(item) {
    inventory[item] = item;
  }
}
