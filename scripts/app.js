function  init() {
//* Dom Elements

  const grid = document.querySelector('.grid')
  const cells = []
  const startBtn = document.querySelector('#start')
  

  //* Grid Variables

  const width = 10
  const height = 15
  const cellCount = width * height

  //* Game Variables
  //? Score
  // let result = 0
  
  //? Player Ship
  let playerShipPosition = 144
  
  
  function creategrid(startingPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
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
  }
  creategrid(playerShipPosition)

  //? Alien Ship
  let currentInvaderIndex = 0
  const invaderShipPositions = [
    0, 1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15
  ]
  
  invaderShipPositions.forEach(invaderShip => cells[currentInvaderIndex + invaderShip].classList.add('invaderShip') )
 
  function moveInvaders() {
    let invaderId 
    let direction = 1 
    cells[invaderShipPositions].classList.remove('invaderShip')
    const leftEdge = invaderShipPositions[0] % width === 0
    const rightEdge = invaderShipPositions[invaderShipPositions.length - 1] % width === width - 1

    if ((leftEdge && direction === -1) || (rightEdge && direction === 1)){
      direction = width
    } else if (direction === width ){
      if (leftEdge) direction = 1
      else direction
    }
    for (let i = 0; i <= invaderShipPositions.length - 1; i++) {
      cells[invaderShipPositions[i]].classList.remove('invaderShip')
    }
    for (let i = 0; i <= invaderShipPositions.length - 1; i++) {
      invaderShipPositions[i] += direction
    }
    for (let i = 0; i <= invaderShipPositions.length - 1; i++) {
      cells[invaderShipPositions].classList.add('invaderShip')
    }
  }
  invaderId = setInterval(moveInvaders, 500


  // invaderShip.forEach(invader => cells[invaderShipPosition + invader].classlist.add('invaderShip'))

  // let num = 0
  // const invaderTime = setInterval(() => {
  //   console.log(num)
  //   num++
  //   if (num > 139) {
  //     clearInterval(invaderTime)
  //   }
  // }, 200)


  // function



  //? Lazer PewPew

  let lazerPosition = playerShipPosition - width

  function handleKeyUp2(event) {
    cells[lazerPosition].classList.remove('lazer')
    const x = lazerPosition % width
    const y = Math.floor(lazerPosition / width)

    
    switch (event.keyCode) {
      case 39:
        if (x < width - 1) lazerPosition++
        break
      case 37:
        if (x > 0) lazerPosition--
        break 
      case 32:
        if (y > 0) lazerPosition -= width
    }
    cells[lazerPosition].classList.add('lazer')
  }


  // function lazerFired(event) {
    
  // }
  // let num2 = lazerPosition
  // const lazerTime = setInterval(() => {
  //   console.log(num2)
  //   num2 - 10
  //   if (num2 < 0) {
  //     clearInterval(lazerTime)
  //   }
  // }, 100)


  // cells[lazerPosition].classList.add('pewPew')




  // }
  // function handleKeyUp(event) {
  //   cells[playerShipPosition].classList.remove('invadership')
  //   const x = playerShipPosition % width
  //   switch (event.keyCode) {
  //     cells[invaderShipPosition].classList.add('invaderShip')
  //   }

  //* Event Listeners

  document.addEventListener('keydown', handleKeyUp)
  document.addEventListener('keydown', handleKeyUp2)
  document.addEventListener('click', startGame)
  // document.addEventListener('keyup', lazerTimer)
}
window.addEventListener('DOMContentLoaded', init)