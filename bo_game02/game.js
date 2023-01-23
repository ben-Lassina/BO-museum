;(function () {
    // init config variables
    let canvas, ctx, defaultFillColour, randoFillColour, score
  
    // setup config variables
    function begin () {
      canvas = document.getElementById('gameCanvas')
      gameText = document.getElementById('gameText')
      ctx = canvas.getContext('2d')
      score = Number(1)    
  
      // colours of the game's shapes
      defaultFillColour = '#5DA1B3'
      randoFillColour = '#FFF581'
  
      let gridObjects = generateGridOfShapes()
  
      // add onClick events to the canvas
      canvas.addEventListener('click', (e) => {
  
        // get mouse position relative to canvas dimensions
        const canvasDimensions = canvas.getBoundingClientRect()
        const clickPosition = {
          x: Math.floor(e.clientX - canvasDimensions.left),
          y: Math.floor(e.clientY - canvasDimensions.top)
        }
  
        // check if the mouse position intersects with the wildcard object
        let i, lostGame
        for (i = 0 ; i < gridObjects.length ; i++ ) {
          if(isInsideAFillColourObject(clickPosition, gridObjects[i], randoFillColour)){
            if (score == 0) {
              gameText.innerHTML = "mooi "
            } else {
              gameText.innerHTML = "goedzo " + score + " keer achter elkaar"
            }
            score = score + 1
            // generate a new grid, start the game again
            gridObjects = generateGridOfShapes()
            lostGame = false
            break
          } // end of isInsideAFillColourObject
          else {
            lostGame = true
          }
        } // end gridObjects loop
  
        if (lostGame){
          // didn't click on the wildcard, reset the score
          gameText.innerHTML = "opnieuw "
          score = 0
        }
  
     }); // end addEventListener
      
    } // end begin
  
      
    // game funcs
    function generateGridOfShapes() {
      listOfShapes = [];
      // grid of objects' size
      let maxObjsHeight = 4
      let maxObjsWidth = 5
  
      // shape area config - all the shapes will be contained
      //
      let sqMargin = 50 
      let sqHeight = 100
      let sqWidth = 100
  
      // a rando vars will 
      // get a different colour
      let randoX = getRandomInRange(0, maxObjsWidth)
      let randoY = getRandomInRange(0, maxObjsHeight)
      let randoFill = ''
  
      let i, j, currX, currY, currWidth, currHeight, currShape, fillColour
      currXStart = 50
      currY = 50
  
      // draw all grid of shapes
      for (j = 0 ; j < maxObjsHeight ; j++){
        currX = currXStart
          for (i = 0 ; i < maxObjsWidth ; i++ ) {
            if ((i == randoX)&&(j==randoY)){
              fillColour = randoFillColour
            } else {
              fillColour = defaultFillColour
            }
            
            currShape = new Rectangle(
              currX, currY, sqWidth, sqHeight,
              fillColour, 'white', '5')
  
            currShape.draw()
            currX = currShape.rightX() + sqMargin
            listOfShapes.push(currShape)
          }
        currY = currShape.lowerY() + sqMargin
      }
  
      return listOfShapes
    } // end generateGridOfShapes
  
    // shape objects
    class Rectangle{
      constructor(
        x = 0, y = 0,
        width = 0, height = 0,
        fillColor = '', strokeColor = '', strokeWidth = 2
      ) {
        this.x = Number(x)
        this.y = Number(y)
        this.width = Number(width)
        this.height = Number(height)
        this.fillColor = fillColor
        this.strokeColor = strokeColor
        this.strokeWidth = Number(strokeWidth)
      }
  
      //class funcs
      area() {
        return this.width * this.height
      }
  
      getFillColor() {
        return this.fillColor
      }
  
      leftX() {
        return this.x
      }
  
      // upperRightX and lowerRightX
      rightX() {
        return this.x + this.width 
      }
  
      // upperLeftY and upperRightY
      upperY() {
        return this.y
      }
      
      // lowerLeftY and lowerRightY
      lowerY() {
        return this.y + this.height
      }
  
      draw() {
        ctx.save()
        ctx.fillStyle = this.fillColor
        ctx.lineWidth = this.strokeWidth
  
        ctx.beginPath()
        ctx.strokeStyle = this.strokeColor
        ctx.rect(this.x, this.y, this.width, this.height)
  
        ctx.fill()
        ctx.stroke()
  
        ctx.restore()
      }
    } // end class Rectangle
    
    // todo: more shapes
  
    // helper funcs
    // getRandomInRange returns a random number within the specified range
    function getRandomInRange(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
  
    // isInsideAFillColourObject returns true if click position is 
    // inside a shape with specified colour
    function isInsideAFillColourObject(point, gridObject, fillColor) {
      return (
        (gridObject.getFillColor() == randoFillColour) &&
        (point.x >= gridObject.leftX()) && 
        (point.x <= gridObject.rightX()) && 
        (point.y >= gridObject.upperY()) &&
        (point.y <= gridObject.lowerY())
      )
    }
  
    function bindCanvasMousePos() {
      const canvasDimensions = canvas.getBoundingClientRect()
    }
  
    // HTML to load
    document.addEventListener('DOMContentLoaded', begin)
  
  })()