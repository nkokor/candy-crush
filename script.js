const width = 8
const squares = []
const colors = [
  'red',
  'yellow',
  'purple',
  'orange',
  'green',
  'blue'
]

let score = 0
let scoreBoard = document.getElementById('score')
scoreBoard.innerHTML = score

function setUpBoard() {
  for(let i = 0; i < 64; i++) {
    const square = document.createElement('div')
    square.className = 'square'
    let candyColorIndex = Math.floor(Math.random() * colors.length)
    square.style.backgroundColor = colors[candyColorIndex]
    square.setAttribute('draggable', true)
    square.setAttribute('id', i)
    board.appendChild(square)
    squares.push(square)
  }
}

let draggedCandy 
let replacedCandy
let draggedSquare
let replacedSquare
let validMoves

function addEventListeners() {
  squares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('dragenter', dragEnter)
    square.addEventListener('dragleave', dragLeave)
    square.addEventListener('drop', dragDrop)
    square.addEventListener('dragend', dragEnd)
  })
}

function dragStart() {
  draggedCandy = this.style.backgroundColor
  draggedSquare = parseInt(this.id)
  validMoves = [draggedSquare - 1, draggedSquare + 1, draggedSquare - width, draggedSquare + width]
}

function dragOver(event) {
  event.preventDefault()
}

function dragEnter() {
}

function dragLeave() {
}

function dragDrop() {
  replacedCandy = this.style.backgroundColor
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
  } else if(replacedSquare && validMove() == false){
    squares[draggedSquare].style.backgroundColor = draggedCandy
    squares[replacedSquare].style.backgroundColor = replacedCandy
  } else {
    squares[draggedSquare].style.backgroundColor = draggedCandy
  }
}

function validMove() {
  return validMoves.includes(replacedSquare)
}

function switchCandies() {
  squares[draggedSquare].style.backgroundColor = replacedCandy
  squares[replacedSquare].style.backgroundColor = draggedCandy
}

function dropCandies() {
  for(let i = 0; i < 55; i++) {
    if(squares[i + width].style.backgroundColor == 'white') {
      squares[i + width].style.backgroundColor = squares[i].style.backgroundColor
      squares[i].style.backgroundColor = 'white'
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isInFirst = firstRow.includes(i)
      if(isInFirst && squares[i].style.backgroundColor == 'white') {
        let newColorIndex = Math.floor(Math.random() * colors.length)
        squares[i].style.backgroundColor = colors[newColorIndex]
      }
    }
  }
}

function matchRowOfThree() {
  const invalid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
  for(let i = 0; i < 61; i++) {
    if(invalid.includes(i) == false) {
      let sequence = [i, i + 1, i + 2]
      let matchedColor = squares[i].style.backgroundColor
      const isEmpty = matchedColor == 'white'
      if(!isEmpty && sequence.every(index => {
        return squares[index].style.backgroundColor == matchedColor
      })) {
        score += 3
        scoreBoard.innerHTML = score
        sequence.forEach(index => {
          squares[index].style.backgroundColor = 'white'
        })
      }
    }
  }
}

function matchRowOfFour() {
  const invalid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
  for(let i = 0; i < 60; i++) {
    if(invalid.includes(i) == false) {
      let sequence = [i, i + 1, i + 2, i + 3]
      let matchedColor = squares[i].style.backgroundColor
      const isEmpty = matchedColor == 'white'
      if(!isEmpty && sequence.every(index => {
        return squares[index].style.backgroundColor == matchedColor
      })) {
        score += 4
        scoreBoard.innerHTML = score
        sequence.forEach(index => {
          squares[index].style.backgroundColor = 'white'
        })
      }
    }
  }
}

function matchRowOfFive() {
  const invalid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55]
  for(let i = 0; i < 59; i++) {
    if(invalid.includes(i) == false) {
      let sequence = [i, i + 1, i + 2, i + 3, i + 4]
      let matchedColor = squares[i].style.backgroundColor
      const isEmpty = matchedColor == 'white'
      if(!isEmpty && sequence.every(index => {
        return squares[index].style.backgroundColor == matchedColor
      })) {
        score += 5
        scoreBoard.innerHTML = score
        sequence.forEach(index => {
          squares[index].style.backgroundColor = 'white'
        })
      }
    }
  }
}

function matchColumnOfThree() {
  for(let i = 0; i < 47; i++) {
    let sequence = [i, i + 8, i + 16]
    let matchedColor = squares[i].style.backgroundColor
    const isEmpty = matchedColor == 'white'
    if(!isEmpty && sequence.every(index => {
      return squares[index].style.backgroundColor == matchedColor
    })) {
      score += 3
      scoreBoard.innerHTML = score
      sequence.forEach(index => {
        squares[index].style.backgroundColor = 'white'
      })
    }
  }
}

function matchColumnOfFour() {
  for(let i = 0; i < 39; i++) {
    let sequence = [i, i + 8, i + 16, i + 24]
    let matchedColor = squares[i].style.backgroundColor
    const isEmpty = matchedColor == 'white'
    if(!isEmpty && sequence.every(index => {
      return squares[index].style.backgroundColor == matchedColor
    })) {
      score += 4
      scoreBoard.innerHTML = score
      sequence.forEach(index => {
        squares[index].style.backgroundColor = 'white'
      })
    }
  }
}

function matchColumnOfFive() {
  for(let i = 0; i < 31; i++) {
    let sequence = [i, i + 8, i + 16, i + 24, i + 32]
    let matchedColor = squares[i].style.backgroundColor
    const isEmpty = matchedColor == 'white'
    if(!isEmpty && sequence.every(index => {
      return squares[index].style.backgroundColor == matchedColor
    })) {
      score += 5
      scoreBoard.innerHTML = score
      sequence.forEach(index => {
        squares[index].style.backgroundColor = 'white'
      })
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board')
  setUpBoard()
  dropCandies()
  addEventListeners()
  matchRowOfFive()
  matchRowOfFour()
  matchRowOfThree()
  matchColumnOfFive()
  matchColumnOfFour()
  matchColumnOfThree()
})

window.setInterval(function() {
  dropCandies()
  matchRowOfFive()
  matchRowOfFour()
  matchRowOfThree()
  matchColumnOfFive()
  matchColumnOfFour()
  matchColumnOfThree()
  }, 100
)


