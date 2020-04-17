function  init() {
//* Dom Elements

  const grid = document.querySelector('.grid')
  let cells = []
  const startBtn = document.querySelector('#startGame')
  // const reloadBtn = document.querySelector('#reload')
  const scoreDisplay = document.querySelector('#score-display')
  const buttons = document.querySelectorAll('.controlButtons')
  let timerId = null
  let direction = 1 
  let gameRunning = false
  let enemyFireTimerID = null

  //* Grid Variables

  const width = 10
  const height = 15
  const cellCount = width * height

  //* Game Variables
  //? Score
  let playerScore = 0

  //? Play sounds 
  function playSound() {
    const sound = document.querySelector('.assetsounds')
    sound.src = './assets/SISFXStart3.wav'
    sound.play()
    console.log('Click')
    const soundTrack = document.querySelector('.soundtrack')
    soundTrack.src = './assets/SoundTrack.wav'
    soundTrack.play()
    console.log('Boom')
  }

  //? ----- CLICK TO START --------- 
  function startGame(event) {
    // // console.log('Click')
    // gameRunning = true
    // const soundTrack = document.querySelector('.soundtrack')
    // soundTrack.src = './assets/SoundTrack.wav'
    // soundTrack.play()
  // //   //? 
  // //   //? 
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

  //? Movement ------  
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
    //? Handle Ship Collisions -------------------------------
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
  let currentInvaderIndex = 0
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
    removeInvaders()
    const dangerZone = [140, 141, 142, 143, 144, 145, 146, 147, 148, 149]
    const aliensInDangerZone = dangerZone.filter(index => invaderShipPositions.includes(index))
    // console.log('areAliensInDangerZone', aliensInDangerZone)
    // console.log('are there aliens in the danger zone?', aliensInDangerZone.length > 0)
    if (aliensInDangerZone.length > 0)  {
      clearInterval(timerId)
      cells[playerShipPosition].classList.remove('playerShip')
      cells[playerShipPosition].classList.add('boomTwo')
      gameRunning = false
      window.alert('YOU SUCK! RELOAD AND TRY AGAIN?')
      gameOver()
    }  else if (currentInvaderIndex % width === 3 && direction === 1) {
      direction = width
    } else if (currentInvaderIndex % width === 3 && direction === width) {        
      direction = -1
    } else if (currentInvaderIndex % width === 0 && direction === -1) {
      direction = width
    } else if (currentInvaderIndex % width === 0 && direction === width) {
      direction = 1
    }
    addInvaders()
    // lastRow()
  }

  if (cells[playerShipPosition].classList.contains('invaderShip')) {
    cells[playerShipPosition].classList.remove('playerShip')
    cells[playerShipPosition].classList.remove('invaderShip')
    cells[playerShipPosition].classList.add('boomTwo')
    clearInterval(timerId)
  }

  //? Remove Invaders from Cell-----------------------------------------
  function removeInvaders() {
    invaderShipPositions.forEach(invader =>
      cells[invader].classList.remove('invaderShip'))
  }
  //? Replace Invaders in Next Cell----------------------------------------
  function addInvaders() {
    invaderShipPositions = invaderShipPositions.map(a => a + direction)
    currentInvaderIndex = currentInvaderIndex + direction
    invaderShipPositions.forEach(invader => {
      cells[invader].classList.add('invaderShip')
      // console.log(invaderShipPositions)
    })
  }
  if (invaderShipPositions.length <= 21 && invaderShipPositions.length >= 15) {
    timerId = setInterval(moveInvaders, 500)
  } else if (invaderShipPositions.length <= 14 && invaderShipPositions.length >= 8) {
    timerId = setInterval(moveInvaders, 300)
  } else if (invaderShipPositions.length <= 7) {
    timerId = setInterval(moveInvaders, 10)
  }
  //? NOT WORKING FOR INCREMENTAL TIMING


  //? Laser PewPew Boom ----- Fires,Starts Timer, Moves and Sound---------

  function lazerFire(event) {
    let lazerPosition = playerShipPosition
    let lazerTimer = 0  
    if (event.keyCode === 32) {
      lazerTimer = setInterval(lazerMoves, 100)
      const sound = document.querySelector('.SFX')
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
        const sound = document.querySelector('.SFX')
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

  //? ENEMY FIRE MIGHT NOT BE FINISHED -------------
  const randomAlien = Math.floor(Math.random() * invaderShipPositions.length)
  let badLazerStart = invaderShipPositions[randomAlien] + width
  if (!cells [badLazerStart].classList.contains('invaderShip')) {
    cells[badLazerStart].classList.add('badLazer')
  } else if (!cells[badLazerStart + width].classList.contains('invaderShip')) {
    cells[badLazerStart].classList.add('badLazer')
  } else {
    cells[badLazerStart].classList.add('badLazer')
  }

  enemyFire()
  enemyFireTimerID = setInterval(enemyFire, 150)

  function enemyFire() {
    cells[badLazerStart].classList.remove('badLazer')
    if (badLazerStart <= 110) {
      badLazerStart += width
      cells[badLazerStart].classList.add('badLazer')
      if (cells[badLazerStart].classList.contains('PlayerShip')) {
        clearInterval(timerId)
        cells[playerShipPosition].classList.remove('playerShip')
        cells[playerShipPosition].classList.add('boomTwo')
        gameRunning = false
        window.alert('YOU SUCK! RELOAD AND TRY AGAIN?')
        gameOver()
      } else {
        clearInterval(badLazerStart)
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
  //? ----- Redundant ----------

  // function lastRow() {
  //   const playerCollision = invaderShipPositions.some(invaderShip => {
  //     return cells[invaderShip].classList.contains('playerShip') //? includes/some comparison of dangerzone and aliens array   
  //   })
  //   if (playerCollision === true) {
  //     gameOver()
  //     gameRunning = false
  //   } return
  // }

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
      Audio.pause()
      for (let i = 0; i < 1000; i++) {
        clearInterval(i)
        // console.log('Game Lost')
      }
      
      window.alert('YOU LOST PLEASE RELOAD')
      
    } 
  }

  //* Event Listeners

  document.addEventListener('keydown', handleKeyUp)
  document.addEventListener('keydown', lazerFire)
  startBtn.addEventListener('click', startGame)
  // reloadBtn.addEventListener('click', resetGame) //? Ran out of time to implement a reload
  buttons.forEach(btn => {
    btn.addEventListener('click', playSound)
  })
    
  // document.addEventListener('keyup', lazerTimer) //* For charging laser if I figure it out in time
}
window.addEventListener('DOMContentLoaded', init)