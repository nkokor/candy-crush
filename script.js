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

document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board')
  setUpBoard()
  addEventListeners()
})


