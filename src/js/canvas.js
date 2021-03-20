import { distance, randomIntFromRange } from './utils'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  init()
})

class Bubble {
  constructor() {
    this.radius = 50
    this.x = randomIntFromRange(this.radius, canvas.width - this.radius)
    this.y = randomIntFromRange(this.radius, canvas.height - this.radius)
    this.color = 'rgba(0,0,0,1)'
    this.vel = {
      x: 3,
      y: 3
    }
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  move() {
    this.x += this.vel.x
    this.y += this.vel.y
  }

  checkBorderCollision() {
    if(this.x >= canvas.width - this.radius || this.x <= 0 + this.radius) {
      this.vel.x *= -1
    }
    if(this.y >= canvas.height - this.radius || this.y <= 0 + this.radius) {
      this.vel.y *= -1
    }
  }

  collision(bubbles) {
    bubbles.forEach(bubble =>{
      let dist = distance(this.x, this.y, bubble.x, bubble.y)
      if(dist <= this.radius * 2){
        this.vel.x *= -1
        this.vel.y *= -1
      }
    })
  }

  update() {
    this.draw()
    this.move()
    this.checkBorderCollision()
  }
}

let bubbles
function init() {
  bubbles = []
  for (let i = 0; i < 10; i++) {
    bubbles.push(new Bubble())
  }
}

function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  bubbles.forEach((bubble, index) => {
    bubble.update()
    bubble.collision(bubbles.slice(0,index).concat(bubbles.slice(index+1)))
  })
}

init()
animate()
