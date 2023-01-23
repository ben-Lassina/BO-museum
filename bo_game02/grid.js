;(function () {
    let canvas, ctx
  
    
    function createGrid () {
    
      const step = 50
  
      
      const width = canvas.width
      const height = canvas.height
  
      
      ctx.save()
      ctx.strokeStyle = 'gray' 
      ctx.fillStyle = 'black' 
      ctx.font = '14px Monospace'
      ctx.lineWidth = 0.35
  
     
      for (let x = 0; x < width; x += step) {
        
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
  
        
        ctx.fillText(x, x, 12)
      }
  
      
      for (let y = 0; y < height; y += step) {
        
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
  
        
        ctx.fillText(y, 0, y)
      }
  
      
      ctx.restore()
    }
  
    function init () {
      
      canvas = document.getElementById('gameCanvas')
      ctx = canvas.getContext('2d')
  
      createGrid()
    }
  
    document.addEventListener('DOMContentLoaded', init)
  })()
  