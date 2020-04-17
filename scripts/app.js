function  init() {
//* Dom Elements

  const grid = document.querySelector('.grid')
  let cells = []
  const startBtn = document.querySelector('#startGame')
  // const reloadBtn = document.querySelector('#reload')
  const scoreDisplay = document.querySelector('#score-display')
  const buttons = document.querySelectorAll('.controlButtons')
  const dangerZone = [140, 141, 142, 143, 144, 145, 146, 147, 148, 149]
  // let timerId = null
  let direction = 1 
  let gameRunning = false

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

  //? ----- CLICK TO START --------- 
  function startGame(event) {
    gameRunning = true
    const SoundTrack = document.querySelector('.soundtrack')
  //   //? 
  //   //? 
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
    //? Handle Ship Collisions
    cells[playerShipPosition].classList.add('playerShip')
    if (cells[playerShipPosition].classList.contains('invaderShip')) {
      cells[playerShipPosition].classList.remove('playerShip')
      cells[playerShipPosition].classList.remove('invaderShip')
      cells[playerShipPosition].classList.add('boomTwo')
      window.alert('YOU SUCK! RELOAD AND TRY AGAIN?')
    }
  }
  creategrid(playerShipPosition)

  //? Alien Ship Index and Draw ------------------------------------------------
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
  //? Move the alien guys -----------------------------------------------------
  function moveInvaders() {
    startGame()
    gameWinner()

    const endPositionLocator = ((width * height) - width)
    removeInvaders()
    if (invaderShipPositions[0] > endPositionLocator)  {
      console.log(invaderShipPositions[0] > endPositionLocator)
      clearInterval(moveInvaders)
      window.alert('YOU SUCK! RELOAD AND TRY AGAIN?')
      //? CURRENTLY NOT WORKING 101 to 104 ----------------
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
    lastRow()
  }

  if (cells[playerShipPosition].classList.contains('invaderShip')) {
    cells[playerShipPosition].classList.remove('playerShip')
    cells[playerShipPosition].classList.remove('invaderShip')
    cells[playerShipPosition].classList.add('boomTwo')
    clearInterval(moveInvaders)
  }
  //? Remove Invaders from Cell-----------------------------------------
  function removeInvaders() {
    invaderShipPositions.forEach(invader =>
      cells[invader].classList.remove('invaderShip'))
  }
  //? Replace Invaders in Next Cell----------------------------------------
  function addInvaders() {
    invaderShipPositions = invaderShipPositions.map(a => a + direction)
    invaderShipPositions.forEach(invader => {
      cells[invader].classList.add('invaderShip')
    })
  }
  setInterval(moveInvaders, 500)


  //? Laser PewPew Boom ----- Fires,Starts Timer, Moves and Sound---------

  function lazerFire(event) {
    let lazerPosition = playerShipPosition
    let lazerTimer = 0  
    if (event.keyCode === 32) {
      lazerTimer = setInterval(lazerMoves, 100)
      const sound = document.querySelector('audio')
      sound.src = './assets/LazerOption2.wav'
      sound.play() 
    }

    // ? Moving Laser and removing ------------------------------------

    function lazerMoves() {
      cells[lazerPosition].classList.remove('lazer')
      lazerPosition -= width
      // console.log(lazerPosition)


      //? Adds and removes laser if collision occurs play sound and remove ship

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
        }, 250)
        if (event.target.classList.contains('lazer' && 'invaderShip')) return
        playerScore += 1000
        scoreDisplay.textContent = `${playerScore}`
        // ? ---------------------------------------------------------------
        // if (playerScore === 210000) {
        //   window.display('YOU WIN --- TRY AGAIN?')
        // }
        // console.log(playerScore)
        //? Wrong way to delcare winner - used alien index . length instead
      } 
      if (lazerPosition < width) {
        cells[lazerPosition].classList.remove('lazer')
        clearInterval(lazerTimer)
      }
    } 
  }

  //? ------ WIN LOSE CONDITIONS -----------------------------------------------------

  //? Game winner when alien array = empty
  function gameWinner() {
    if (invaderShipPositions.length === 0) {
      gameRunning === false 
      invaderShipPositions = [
        0, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23, 24, 25, 26
      ]
      direction = 1
      playerShipPosition = 144
      grid.innerHTML = ''
      cells = []
      for (let i = 0; i < 1000; i++) {
        clearInterval(i)
      }
      window.alert('YOU ARE A WINNER PLEASE RELOAD')
      clearInterval(moveInvaders)
    }
    // console.log(invaderShipPositions.length)
  }

  //? Indicates Last row for game completion
  // function inTheZone() {
  //   if (invaderShipPositions === dangerZone) {
  //     gameOver()
  //   }
  // }

  function lastRow() {
    const playerCollision = invaderShipPositions.every(invaderShip => {
      return cells[invaderShip].classList.contains('playerShip')    
    })
    if (playerCollision === true) {
      gameOver()
      gameRunning = false
    } return
  }

  //? Ends Game and returns to initial psotion
  function gameOver() {
    if (gameRunning === false) {
      invaderShipPositions = [
        0, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23, 24, 25, 26
      ]
      direction = 1
      playerShipPosition = 144
      grid.innerHTML = ''
      cells = []
      clearInterval(moveInvaders)
      clearInterval(lazerFire)
      clearInterval()
      for (let i = 0; i < 1000; i++) {
        clearInterval(i)
        console.log('Game Lost')
      }
      
      window.alert('YOU LOST PLEASE RELOAD')
      
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