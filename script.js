const width = 8

const squares = []

const colors = [
  'url(images/pig.png)',
  'url(images/cow.png)',
  'url(images/mouse.png)',
  'url(images/puppy.png)',
  'url(images/bumblebee.png)',
  'url(images/bear.png)'
]

let scoreBoard = document.getElementById('score')
let movesTitle = document.getElementById('moves-p')
let movesInfo = document.getElementById('moves')
let levelTitle = document.getElementById('level-p')
let levelInfo = document.getElementById('level')
let requiredCandyImage = document.getElementById('candy')
let candiesTimes = document.getElementById('candies-p')
let candiesInfo = document.getElementById('candies')

let currentLevel = 0
let movesAvailable = 0
let candiesLeft = 0

let playButton = document.getElementById('button')
playButton.addEventListener('click', play)

let draggedCandy 
let replacedCandy
let draggedSquare
let replacedSquare
let validMoves

let intervalID

function setUpBoard() {
  for(let i = 0; i < 64; i++) {
    const square = document.createElement('div')
    square.className = 'square'
    let candyColorIndex = Math.floor(Math.random() * colors.length)
    square.style.backgroundImage = colors[candyColorIndex]
    square.setAttribute('draggable', true)
    square.setAttribute('id', i)
    square.className = 'square'
    board.appendChild(square)
    squares.push(square)
  }
}

function addEventListeners() {
  squares.forEach(square => {
    if(square.style.backgroundImage != '' && !square.style.backgroundImage.includes('bomb')) {
      square.addEventListener('dragstart', dragStart)
      square.addEventListener('dragover', dragOver)
      square.addEventListener('drop', dragDrop)
      square.addEventListener('dragend', dragEnd)
    } else if(square.style.backgroundImage.includes('bomb')) {
      square.addEventListener('click', popCandies)
    }
  })
}

function removeEventListeners() {
  squares.forEach(square => {
    if(square.style.backgroundImage != '' && !square.style.backgroundImage.includes('bomb')) {
      square.removeEventListener('dragstart', dragStart)
      square.removeEventListener('dragover', dragOver)
      square.removeEventListener('drop', dragDrop)
      square.removeEventListener('dragend', dragEnd)
    } else if(square.style.backgroundImage.includes('bomb')) {
      square.removeEventListener('click', popCandies)
    }
  })
}

function dragStart() {
  var audio = new Audio('sound-effects/pickup.mp3');
  audio.play();
  draggedCandy = this.style.backgroundImage
  draggedSquare = parseInt(this.id)
  validMoves = [draggedSquare - 1, draggedSquare + 1, draggedSquare - width, draggedSquare + width]
}

function dragOver(event) {
  event.preventDefault()
}

function dragDrop() {
  replacedCandy = this.style.backgroundImage
  replacedSquare = parseInt(this.id)
  if(validMove()) {
    switchCandies()
  }
}

function dragEnd() {
  if(replacedSquare && validMove()) {
    replacedSquare = null
    replacedCandy = null
    validMoves = []
    draggedSquare = null
    draggedCandy = null
    movesAvailable--
    movesInfo.innerText = movesAvailable
  } else if(replacedSquare && validMove() == false){
    squares[draggedSquare].style.backgroundImage = draggedCandy
    squares[replacedSquare].style.backgroundImage = replacedCandy
    var audio = new Audio('sound-effects/drop.mp3');
    audio.play();
  } else {
    squares[draggedSquare].style.backgroundImage = draggedCandy
    var audio = new Audio('sound-effects/drop.mp3');
    audio.play();
  }
}

function popCandies() {
  var audio = new Audio('sound-effects/bomb-pop.mp3');
  audio.play();
  movesAvailable--
  movesInfo.innerText = movesAvailable
  let collected = 0
  for(i = 0; i < 64; i++) {
    if(squares[i].style.backgroundImage === requiredCandyImage.style.backgroundImage) {
      collected += 1
    }
    squares[i].style.backgroundImage = ''
  }
  handleScore(collected)
}

function validMove() {
  return validMoves.includes(replacedSquare)
}

function switchCandies() {
  squares[draggedSquare].style.backgroundImage = replacedCandy
  squares[replacedSquare].style.backgroundImage = draggedCandy
}

function dropCandies() {
  for(let i = 0; i < 56; i++) {
    if(squares[i + width].style.backgroundImage == '') {
      squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
      squares[i].style.backgroundImage = ''
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isInFirst = firstRow.includes(i)
      if(isInFirst && squares[i].style.backgroundImage == '') {
        let newColorIndex = Math.floor(Math.random() * colors.length)
        squares[i].style.backgroundImage = colors[newColorIndex]
      }
    }
  }
  for(let i = 0; i < 8; i++) {
    if(squares[i].style.backgroundImage == '') {
      let newColorIndex = Math.floor(Math.random() * colors.length)
      squares[i].style.backgroundImage = colors[newColorIndex]
    }
  }
}

let gameOver = false

function clearBoard() {
  for(let i = 0; i < 64; i++) {
    squares[i].style.backgroundImage = ''
  }
}

function setLevel() {
  clearBoard()
  movesTitle.innerText = 'Moves: '
  levelTitle.innerText = 'Level: '
  candiesTimes.innerText = 'x'
  levelConfiguration = levels[currentLevel]
  levelInfo.innerText = currentLevel + 1
  setRequiredCandyImage()
  candiesInfo.innerText = levelConfiguration.candiesRequired[1]
  movesInfo.innerText = levelConfiguration.movesAllowed
  movesAvailable = levelConfiguration.movesAllowed
  candiesLeft = levelConfiguration.candiesRequired[1]
}

function handleScore(candiesCollected) {
  if(candiesLeft - candiesCollected <= 0) {
    candiesLeft = 0
    var audio = new Audio('sound-effects/level-up.mp3');
    audio.play();
    currentLevel += 1
    setLevel()
  } else {
    candiesLeft -= candiesCollected
    candiesInfo.innerText = candiesLeft
  }
}

function matchRowOfThree() {
  const invalid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
  for(let i = 0; i < 61; i++) {
    if(invalid.includes(i) == false) {
      let sequence = [i, i + 1, i + 2]
      let matchedColor = squares[i].style.backgroundImage
      const isEmpty = matchedColor == ''
      if(!isEmpty && sequence.every(index => {
        return squares[index].style.backgroundImage == matchedColor
      })) {
        if(matchedColor === requiredCandyImage.style.backgroundImage) {
          handleScore(3)
        }
        sequence.forEach(index => {
          squares[index].style.backgroundImage = ''
        })
        var audio = new Audio('sound-effects/match1.mp3');
        audio.play();
      }
    }
  }
}

function matchRowOfFour() {
  const invalid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
  for(let i = 0; i < 60; i++) {
    if(invalid.includes(i) == false) {
      let sequence = [i, i + 1, i + 2, i + 3]
      let matchedColor = squares[i].style.backgroundImage
      const isEmpty = matchedColor == ''
      if(!isEmpty && sequence.every(index => {
        return squares[index].style.backgroundImage == matchedColor
      })) {
        if(matchedColor === requiredCandyImage.style.backgroundImage) {
          handleScore(4)
        }
        sequence.forEach(index => {
          if(index == i) {
            squares[index].style.backgroundImage = "url(images/bomb.png)"
            var audio = new Audio('sound-effects/bomb-created.mp3');
            audio.play();
          } else {
            squares[index].style.backgroundImage = ''
          }
        })
        var audio = new Audio('sound-effects/match2.mp3');
        audio.play();
      }
    }
  }
}

function matchColumnOfThree() {
  for(let i = 0; i < 47; i++) {
    let sequence = [i, i + 8, i + 16]
    let matchedColor = squares[i].style.backgroundImage
    const isEmpty = matchedColor == ''
    if(!isEmpty && sequence.every(index => {
      return squares[index].style.backgroundImage == matchedColor
    })) {
      if(matchedColor === requiredCandyImage.style.backgroundImage) {
        handleScore(3)
        candiesInfo.innerText = candiesLeft
      }
      sequence.forEach(index => {
        squares[index].style.backgroundImage = ''
      })
      var audio = new Audio('sound-effects/match1.mp3');
      audio.play();
    }
  }
}

function matchColumnOfFour() {
  for(let i = 0; i < 39; i++) {
    let sequence = [i, i + 8, i + 16, i + 24]
    let matchedColor = squares[i].style.backgroundImage
    const isEmpty = matchedColor == ''
    if(!isEmpty && sequence.every(index => {
      return squares[index].style.backgroundImage == matchedColor
    })) {
      if(matchedColor === requiredCandyImage.style.backgroundImage) {
        handleScore(4)
        candiesInfo.innerText = candiesLeft
      }
      sequence.forEach(index => {
        if(index == i) {
          squares[index].style.backgroundImage = "url(images/bomb.png)"
          var audio = new Audio('sound-effects/bomb-created.mp3');
          audio.play();
        } else {
          squares[index].style.backgroundImage = ''
        }
      })
      var audio = new Audio('sound-effects/match2.mp3');
      audio.play();
    }
  }
}

function matchCandies() {
  matchRowOfFour()
  matchColumnOfFour()
  matchRowOfThree()
  matchColumnOfThree()
}

document.addEventListener('DOMContentLoaded', () => {
  setUpBoard()
})

function setRequiredCandyImage() {
  colors.forEach(color => {
    if(color.includes(levelConfiguration.candiesRequired[0])) {
      requiredCandyImage.style.backgroundImage = color
      return
    }
  })
}

function play() {
  setLevel()
  addEventListeners()
  dropCandies()
  matchCandies()
  intervalID = window.setInterval(function() {
    removeEventListeners()
    addEventListeners()
    dropCandies()
    matchCandies()
    }, 100
  )
}


