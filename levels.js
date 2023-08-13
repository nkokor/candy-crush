class Level {
  constructor(level, movesAllowed, candiesRequired) {
    this.level = level
    this.movesAllowed = movesAllowed;
    this.candiesRequired = candiesRequired;
  }
}

const level1 = new Level(1, 15,
   ['puppy', 18]
)

const level2 = new Level(2, 20, 
   ['cow', 20]
)

const level3 = new Level(3, 23, 
  ['pig', 30]
)

const levels = [
  level1,
  level2,
  level3
]

console.log(levels)