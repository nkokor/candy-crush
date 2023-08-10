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
  console.log(this.id, 'dragstart')
}

function dragOver(event) {
  event.preventDefault()
  console.log(this.id, 'dragover')
}

function dragEnter() {
  console.log(this.id, 'dragenter')
}

function dragLeave() {
  console.log(this.id, 'dragleave')
}

function dragDrop() {
  replacedCandy = this.style.backgroundColor
  replacedSquare = parseInt(this.id)
  if(validMove()) {
    switchCandies()
  }
  console.log(this.id, 'dragdrop')
}

function dragEnd() {
  console.log(this.id, 'dragend')
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

document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board')
  setUpBoard()
  addEventListeners()
})


