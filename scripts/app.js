function  init() {
//* Dom Elements

  const grid = document.querySelector('.grid')
  const cells = []
  
  

  //* Grid Variables

  const width = 10
  const height = 15
  const cellCount = width * height

  //* Game Variables

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
  const invaderShipPosition = 0

  let num = 0
  const invaderTime = setInterval(() => {
    console.log(num)
    num++
    if (num > 139) {
      clearInterval(invaderTime)
    }
  }, 200)


  // function

  cells[invaderShipPosition].classList.add('invaderShip')


  //? Lazer PewPew

  let lazerPosition = playerShipPosition - 10

  function handleKeyUp2(event) {
    cells[lazerPosition].classList.remove('lazer')
    const x = lazerPosition % width
    
    switch (event.keyCode) {
      case 39:
        if (x < width - 1) lazerPosition++
        break
      case 37:
        if (x > 0) lazerPosition--
        break 
      case 32:
        if (x > 0) lazerPosition - width
    }
    cells[lazerPosition].classList.add('lazer')
  }


  function lazerFired(event) {
    
  }
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

  document.addEventListener('keyup', handleKeyUp)
  document.addEventListener('keyup', handleKeyUp2)
}
window.addEventListener('DOMContentLoaded', init)