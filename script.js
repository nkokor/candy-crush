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

function matchRowOfThree() {
  for(let i = 0; i < 61; i++) {
    let sequence = [i, i + 1, i + 2]
    let matchedColor = squares[i].style.backgroundColor
    const isEmpty = matchedColor == 'white'
    if(!isEmpty && sequence.every(index => {
      return squares[index].style.backgroundColor == matchedColor
    })) {
      score += 3
      sequence.forEach(index => {
        squares[index].style.backgroundColor = 'white'
      })
    }
  }
}

function matchColumnOfThree() {
  for(let i = 0; i < 45; i++) {
    let sequence = [i, i + 8, i + 16]
    let matchedColor = squares[i].style.backgroundColor
    const isEmpty = matchedColor == 'white'
    if(!isEmpty && sequence.every(index => {
      return squares[index].style.backgroundColor == matchedColor
    })) {
      score += 3
      sequence.forEach(index => {
        squares[index].style.backgroundColor = 'white'
      })
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board')
  setUpBoard()
  addEventListeners()
  matchRowOfThree()
  matchColumnOfThree()
})

window.setInterval(function() {
  matchRowOfThree()
  matchColumnOfThree()
  }, 100
)


