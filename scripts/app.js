function  init() {
//* Dom Elements

  const grid = document.querySelector('.grid')
  const cells = []
  const startBtn = document.querySelector('#startGame')
  const reloadBtn = document.querySelector('#reload')
  const scoreDisplay = document.querySelector('#score-display')
  const buttons = document.querySelectorAll('.controlButtons')
  let timerId = null
  let direction = 1 
  let gameRunning = true

  //* Grid Variables

  const width = 10
  const height = 15
  const cellCount = width * height

  //* Game Variables
  //? Score
  let playerScore = 0

  //? Play sounds 
  function playSound() {
    const sound = document.querySelector('audio')
    sound.src = './assets/UfoArtic1.wav'
    sound.play()
  //   const soundTrack = document.querySelector('audio')
  //   sound.src = './assets/SoundTrack.wav'
  //   sound.play()
  }

  //? Player Ship
  let playerShipPosition = 144
  
  
  function creategrid(startingPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      // cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    cells[startingPosition].classList.add('playerShip')
  }


  function handleKeyUp(event) {
    cells[playerShipPosition].classList.remove('playerShip')
    const x = playerShipPosition % width
    switch (event.keyCode) {
      case 39:
        if (x < width - 1) playerShipPosition++
        break
      case 37:
        if (x > 0) playerShipPosition--
        break 

    }
    cells[playerShipPosition].classList.add('playerShip')
    if (cells[playerShipPosition].classList.contains('invaderShip')) {
      cells[playerShipPosition].classList.remove('playerShip')
      cells[playerShipPosition].classList.remove('invaderShip')
      cells[playerShipPosition].classList.add('boomTwo')
      clearInterval(moveInvaders)
      window.alert('YOU LOSE!')
    }
  }
  creategrid(playerShipPosition)

  //? Alien Ship
  const currentInvaderIndex = 0
  let invaderShipPositions = [
    0, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23, 24, 25, 26
  ]
  
  invaderShipPositions.forEach(invaderShip => cells[currentInvaderIndex + invaderShip].classList.add('invaderShip') )

  // function gameOver(event) {
  //   if (invaderShipPositions[i] > width * height - width)  {
  //     setTimeout(moveInvaders)
  //     window.alert('YOU SUCK')
  //   }
  // }

  function moveInvaders() {
    removeInvaders()
    if (invaderShipPositions[0] > width * height - width)  {
      clearInterval(moveInvaders)
    }  else if (invaderShipPositions[0] % width === 3 && direction === 1) {
      direction = width
    } else if (invaderShipPositions[0] % width === 3 && direction === width) {        
      direction = -1
    } else if (invaderShipPositions[0] % width === 0 && direction === -1) {
      direction = width
    } else if (invaderShipPositions[0] % width === 0 && direction === width) {
      direction = 1
    }
    addInvaders()
  }

  if (cells[playerShipPosition].classList.contains('invaderShip')) {
    cells[playerShipPosition].classList.remove('playerShip')
    cells[playerShipPosition].classList.remove('invaderShip')
    cells[playerShipPosition].classList.add('boomTwo')
    clearInterval(moveInvaders)
    window.alert('YOU LOSE!')
  }

  function removeInvaders() {
    invaderShipPositions.forEach(invader =>
      cells[invader].classList.remove('invaderShip'))
  }

  function addInvaders() { // draws the invaders back on their new position on the grid
    invaderShipPositions = invaderShipPositions.map(a => a + direction)
    invaderShipPositions.forEach(invader => {
      cells[invader].classList.add('invaderShip')
    })
  }
  setInterval(moveInvaders, 500)

  //? Lazer PewPew Boom
  function lazerFire(event) {
    let lazerPosition = playerShipPosition
    let lazerTimer   
    if (event.keyCode === 32) {
      lazerTimer = setInterval(lazerMoves, 100)
      const sound = document.querySelector('audio')
      sound.src = './assets/LazerOption2.wav'
      sound.play()
      // * function to shoot and remove invaders
      function lazerMoves() {
        cells[lazerPosition].classList.remove('lazer')
        lazerPosition -= width
        // console.log(lazerPosition)
        cells[lazerPosition].classList.add('lazer')
        if (cells[lazerPosition].classList.contains('invaderShip')) {
          cells[lazerPosition].classList.remove('lazer')
          cells[lazerPosition].classList.remove('invaderShip')
          invaderShipPositions = invaderShipPositions.filter(invaderShip =>{
            return cells[invaderShip].classList.contains('invaderShip')
          })
          cells[lazerPosition].classList.add('boomOne')
          const sound = document.querySelector('audio')
          sound.src = './assets/ExplodeShip.wav'
          sound.play()
          clearInterval(lazerTimer)
          setTimeout(() => {
            cells[lazerPosition].classList.remove('boomOne')
          }, 250);
          if (event.target.classList.contains('lazer' && 'invaderShip')) return
          playerScore += 1000
          scoreDisplay.textContent = `${playerScore}`
          // if (playerScore === 210000) {
          //   window.display('YOU WIN --- TRY AGAIN?')
          // }
          // console.log(playerScore)
          } 
        if (lazerPosition < width) {
            cells[lazerPosition].classList.remove('lazer')
            clearInterval(lazerTimer)
        }
      } 
    }
  }


  //* Event Listeners

  document.addEventListener('keydown', handleKeyUp)
  document.addEventListener('keydown', lazerFire)
  startBtn.addEventListener('click', startGame)
  // reloadBtn.addEventListener('click', resetGame)
  buttons.forEach(btn => {
    btn.addEventListener('click', playSound)
  })
    
  // document.addEventListener('keyup', lazerTimer) //* For charging laser if I figure it out in time
}
window.addEventListener('DOMContentLoaded', init)

