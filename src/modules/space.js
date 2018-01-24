import { canvasArea } from './lib/canvas.js'
import { Render } from './queue/render'
import { Undo } from './queue/undo'
import { Store } from '../modules/store/store'
import { UI } from './ui'
import { $, $$ } from './util'

export class Space {
  constructor() {
    this.c = $('#c')
    this.ctx = $('#c').getContext('2d')
    this.ca = $('#ca')
    this.rc = $('#rc')
    this.state = new Store()
    this.state.render = new Render()
    this.state.undo = new Undo()
    this.ui = new UI(this)
    this.randomizeBrushes(this.state.brush.randomCount)
  }

  paintLoop() {
    this.paint()
    this.paintLoopInterval = setInterval(this.paint.bind(this), 1000 / this.state.brush.flow)
  }

  paint() {
    const brushesSelected = this.state.brush.selected
    const allBrushes = this.state.brush.all
    for (const brushIndex in brushesSelected) {
      const thisBrush = brushesSelected[brushIndex]
      const brushPoint = this.getBrushPoint(allBrushes[thisBrush].w)
      switch (allBrushes[thisBrush].c) {
        case 0: // pixel
          var entry = {
            c: allBrushes[thisBrush].c,
            t: allBrushes[thisBrush].t,
            x: brushPoint.x,
            y: brushPoint.y,
            h: allBrushes[thisBrush].h,
            w: allBrushes[thisBrush].w,
            r: allBrushes[thisBrush].r,
            g: allBrushes[thisBrush].g,
            b: allBrushes[thisBrush].b,
            a: allBrushes[thisBrush].a
          }
          break
        case 1: // arc
          var entry = {
            c: allBrushes[thisBrush].c,
            t: allBrushes[thisBrush].t,
            x: brushPoint.x,
            y: brushPoint.y,
            d: allBrushes[thisBrush].d,
            r: allBrushes[thisBrush].r,
            g: allBrushes[thisBrush].g,
            b: allBrushes[thisBrush].b,
            a: allBrushes[thisBrush].a
          }
          break
        case 2: // star
          var entry = {
            c: allBrushes[thisBrush].c,
            t: allBrushes[thisBrush].t,
            x: brushPoint.x,
            y: brushPoint.y,
            p: allBrushes[thisBrush].p,
            o: allBrushes[thisBrush].o,
            i: allBrushes[thisBrush].i,
            r: allBrushes[thisBrush].r,
            g: allBrushes[thisBrush].g,
            b: allBrushes[thisBrush].b,
            a: allBrushes[thisBrush].a
          }
        default:
          break
      }
      if (this.state.isQueuing) {
        // create new item
        var q = {
          visible: true,
          items: [entry]
        }
        this.state.render.queue.push(q)
        this.state.isQueuing = false
        // clear undo anytime a new item is created
        this.state.undo.queue = []
      } else {
        // insert into existing item
        this.state.render.queue[this.state.render.queue.length - 1].items.push(entry)
      }
    }
  }

  getBrushPoint(brushSize) {
    const point = this.state.mouse
    let originaly = parseInt(point.y)
    let originalx = parseInt(point.x)
    let y = parseInt(point.y)
    let x = parseInt(point.x)
    if (parseInt(this.state.brush.spread) > 0) {
      const xRangeMin = x - parseInt(this.state.brush.spread)
      const xRangeMax = x + parseInt(this.state.brush.spread / 2)
      const yRangeMin = y - this.state.brush.spread
      const yRangeMax = y + this.state.brush.spread / 2
      x = Math.floor(Math.random() * (xRangeMax - xRangeMin + 1) + xRangeMin)
      y = Math.floor(Math.random() * (yRangeMax - yRangeMin + 1) + yRangeMin)
      const angle = this.getRandomFloat(0, Math.PI * 2)
      x = x + this.state.brush.spread * Math.cos(angle)
      y = y + this.state.brush.spread * Math.sin(angle)
      return {
        x: Math.floor(x),
        y: Math.floor(y)
      }
    } else {
      // brush spread is 0 so center image on mouse
      x = Math.floor(x - brushSize / 2)
      y = Math.floor(y - brushSize / 2)
      return {
        x: Math.floor(x),
        y: Math.floor(y)
      }
    }
  }

  render() {
    // const start = performance.now()
    let w = this.ctx.canvas.width,
      h = this.ctx.canvas.height,
      sz = 20 * this.ca.view.scl,
      xoff = this.ca.view.x % sz,
      yoff = this.ca.view.y % sz

    // fill background black on every frame
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, w, h)

    // Render
    const renderQueueLength = this.state.render.queue.length
    this.ctx.save()
    for (let index = 0; index < renderQueueLength; index++) {
      for (let item of this.state.render.queue[index].items) {
        switch (item.c) {
          case 0:
            this.drawPixel(item.t, item.x, item.y, item.w, item.h, item.r, item.g, item.b, item.a)
            break
          case 1:
            this.drawCircle(item.x, item.y, item.d, 0, Math.PI * 2, false, item.r, item.g, item.b, item.a)
            break
          case 2:
            this.drawStar(item.x, item.y, item.p, item.o, item.i, item.r, item.g, item.b, item.a)
          default:
            break
        }
      }
    }
    this.ctx.restore()
  }

  drawStar(xPos, yPos, points, outerRadius, innerRadius, red, green, blue, alpha) {
    var rot = Math.PI / 2 * 3
    var x = xPos
    var y = yPos
    var step = Math.PI / points
    this.ctx.setTransform(this.ca.view.scl, 0, 0, this.ca.view.scl, this.ca.view.x + 0.5, this.ca.view.y + 0.5)
    this.ctx.beginPath()
    this.ctx.moveTo(xPos, yPos - outerRadius)
    for (var i = 0; i < points; i++) {
      x = xPos + Math.cos(rot) * outerRadius
      y = yPos + Math.sin(rot) * outerRadius
      this.ctx.lineTo(x, y)
      rot += step
      x = xPos + Math.cos(rot) * innerRadius
      y = yPos + Math.sin(rot) * innerRadius
      this.ctx.lineTo(x, y)
      rot += step
    }
    this.ctx.lineTo(xPos, yPos - outerRadius)
    this.ctx.closePath()
    this.ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`
    this.ctx.fill()
  }

  drawCircle(x, y, radius, startAngle, endAngle, anticlockwise, red, green, blue, alpha) {
    this.ctx.beginPath()
    this.ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`
    this.ctx.setTransform(this.ca.view.scl, 0, 0, this.ca.view.scl, this.ca.view.x + 0.5, this.ca.view.y + 0.5)
    this.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
    this.ctx.fill()
  }

  drawPixel(twinkle, xPos, yPos, width, height, red, green, blue, alpha) {
    // draw random pixels
    if (twinkle) {
      const maxWidth = width + 1
      const minWidth = width === 1 ? 1 : width - 1
      const maxHeight = height + 1
      const minHeight = height === 1 ? 1 : height - 1
      width = Math.random() * (maxWidth - maxWidth + 1) + minWidth
      height = Math.random() * (maxHeight - maxHeight + 1) + minHeight
    }
    this.ctx.setTransform(this.ca.view.scl, 0, 0, this.ca.view.scl, this.ca.view.x + 0.5, this.ca.view.y + 0.5)
    this.ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`
    this.ctx.fillRect(xPos, yPos, width, height)
  }

  generateStars(quantity, spread) {
    const xRangeMin = -spread
    const xRangeMax = spread
    const yRangeMin = -spread
    const yRangeMax = spread
    let group = {
      v: true,
      items: []
    }
    for (let index = 0; index < quantity; index++) {
      let xPos = Math.random() * (parseInt(xRangeMax) - parseInt(xRangeMax) + 1 + parseInt(xRangeMin))
      let yPos = Math.random() * (parseInt(yRangeMax) - parseInt(yRangeMax) + 1 + parseInt(yRangeMin))
      group.items.push({
        t: false,
        x: xPos,
        y: yPos,
        w: 1,
        h: 1,
        r: 255,
        g: 255,
        b: 255,
        a: 1
      })
    }
    this.state.render.queue.push(group)
    group = {
      v: true,
      items: []
    }
    for (let index = 0; index < quantity; index++) {
      let xPos = Math.random() * (parseInt(xRangeMax) - parseInt(xRangeMax) + 1 + parseInt(xRangeMin))
      let yPos = Math.random() * (parseInt(yRangeMax) - parseInt(yRangeMax) + 1 + parseInt(yRangeMin))
      group.items.push({
        t: false,
        x: xPos,
        y: yPos,
        w: 2,
        h: 2,
        r: 255,
        g: 255,
        b: 255,
        a: 1
      })
    }
    this.state.render.queue.push(group)
  }

  getRandomFloat(min, max) {
    return Math.random() * (max - min) + min
  }

  randomizeBrushes(numBrushes) {
    numBrushes = numBrushes || 2
    const allBrushes = []
    let selectedBrushes = []
    const randomColors = [
      { name: 'red', r: 255, g: 0, b: 0 },
      { name: 'orange', r: 255, g: 165, b: 0 },
      { name: 'yellow', r: 255, g: 255, b: 0 },
      { name: 'blue', r: 0, g: 0, b: 255 },
      { name: 'purple', r: 128, g: 0, b: 128 },
      { name: 'pink', r: 255, g: 0, b: 255 },
      { name: 'green', r: 0, g: 255, b: 0 }
    ]
    let i = 0
    for (i = 0; i < numBrushes; i++) {
      let randomColorIndex = Math.floor(this.getRandomFloat(0, randomColors.length))
      let item = Object.assign({}, randomColors[randomColorIndex])
      item.c = Math.floor(this.getRandomFloat(0, 3))
      switch (item.c) {
        case 0:
          let randomSize = Math.floor(this.getRandomFloat(1, 3))
          item.h = randomSize
          item.w = randomSize
          break
        case 1:
          item.d = this.getRandomFloat(0.3, 2)
          break
        case 2:
          let randomInnerSize = Math.floor(this.getRandomFloat(1, 2))
          let randomOuterSize = Math.floor(this.getRandomFloat(2, 3))
          let randomPoints = Math.floor(this.getRandomFloat(4, 8))
          item.p = randomPoints
          item.o = randomOuterSize
          item.i = randomInnerSize
          break
      }
      // disable colors for now
      if (i >= 0) {
        item.r = 255
        item.g = 255
        item.b = 255
      }
      item.a = 1
      item.t = 0
      selectedBrushes.push(i)
      allBrushes.push(item)
    }
    this.state.brush.selected = selectedBrushes
    this.state.brush.all = allBrushes
  }
}
