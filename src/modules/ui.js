import { $, $$ } from './util'

export class UI {
  constructor(space) {
    this.space = space
    this.menus = [
      {
        // Top Left
        id: 'menuTopLeft',
        resize: { x: false, y: false },
        visible: true
      },
      {
        // Top Center
        id: 'menuTopCenter',
        resize: { x: true, y: false },
        visible: true
      },
      {
        // Top Right
        id: 'menuTopRight',
        resize: { x: false, y: false },
        visible: true
      },
      {
        // Center
        id: 'menuCenter',
        resize: { x: true, y: true },
        visible: true
      },
      {
        // Bottom Left
        id: 'menuBottomLeft',
        resize: { x: false, y: false },
        visible: true
      },
      {
        // Bottom Center
        id: 'menuBottomCenter',
        resize: { x: true, y: false },
        visible: true
      },
      {
        // Bottom Right
        id: 'menuBottomRight',
        resize: { x: false, y: false },
        visible: true
      }
    ]
    this.submenus = document.getElementsByClassName('subMenu')
    this.messages = document.getElementsByClassName('message')
    this.closeButtons = document.getElementsByClassName('btnMessageAction')
    this.resize()
    this.observeCanvasEvents()
    this.observeWindowEvents()
    this.observeClickEvents()
    this.observeMouseEvents()

    setInterval(this.uiLoop.bind(this), 60)
  }

  uiLoop() {
    const r = this.space.state.render.queue
    const u = this.space.state.undo.queue
    // enable / disable clear button
    if (r.length > 0) {
      // enable
      $('#clear').removeAttribute('disabled')
      $('#clear').classList.remove('disabled')
    } else {
      // disable
      if (!u.length > 0) {
        $('#clear').setAttribute('disabled', true)
        $('#clear').classList.add('disabled')
      }
    }

    // enable / disable undo button
    if (r.length > 0) {
      // enable
      $('#undo').removeAttribute('disabled')
      $('#undo').classList.remove('disabled')
    } else {
      // disable
      $('#undo').setAttribute('disabled', true)
      $('#undo').classList.add('disabled')
    }

    // enable / disable redo button
    if (u.length > 0) {
      // enable
      $('#redo').removeAttribute('disabled')
      $('#redo').classList.remove('disabled')
    } else {
      // disable
      $('#redo').setAttribute('disabled', true)
      $('#redo').classList.add('disabled')
    }

    // enable / disable save button
    if (r.length > 0) {
      // enable
      $('#save').removeAttribute('disabled')
      $('#save').classList.remove('disabled')
    } else {
      // disable
      $('#save').setAttribute('disabled', true)
      $('#save').classList.add('disabled')
    }
  }

  observeCanvasEvents() {
    // observe pointer movement on canvas-area
    this.space.ca.observe('pointer', e => {
      let { x, y } = this.space.ca.pntToUsr(e)
      const prec = Math.max(Math.log(this.space.ca.view.scl) / Math.log(2), 0)
      this.space.state.mouse = { x: x.toFixed(prec), y: y.toFixed(prec) }
      // console.log('pointer stuff')
    })
    // listen for mouse button presses on canvas-area
    this.space.ca.observe('buttondown', e => {
      if (e.buttons === 1) {
        // instead of pre-emptively undoing maybe observe mouse bounds?
        clearInterval(this.space.paintLoopInterval)
        this.space.state.isPainting = true
        this.space.paintLoop()
      }
    })
    // listen for mouse button up on canvas-area
    this.space.ca.observe('buttonup', e => {
      if (e.buttons === 1) {
        this.space.state.isPainting = false
        this.space.state.isQueuing = true
        clearInterval(this.space.paintLoopInterval)
      }
    })
    // listen for mouse scroll
    this.space.ca.observe('view', e => {
      const scale = $('#scale')
      const menu = $('.menuBottomCenter')
      scale.innerHTML = this.space.ca.view.scl.toFixed(2)
      this.space.ca.view.scl.toFixed(2) == 1.0 ? (menu.style.color = 'white') : (menu.style.color = 'grey')
    })
  }

  observeWindowEvents() {
    window.addEventListener('resize', this.resize.bind(this))
    // save state to local storage on browser close/navigate
    // window.addEventListener('beforeunload', this.saveToLocalStorage.bind(this))
  }

  observeClickEvents() {
    // CLEAR
    $('#clear').addEventListener('click', () => {
      console.log('cleared')
      this.clear(this.space)
    })
    // LOG
    // $('#console').addEventListener('click', () => {
    //   this.log(this.space)
    // })
    // SAVE
    $('#save').addEventListener('click', () => {
      this.save(this.space)
    })
    // Github
    $('#github').addEventListener('click', e => {
      e.preventDefault()
      window.open('https://github.com/kschluter/stars')
    })

    Array.from(this.submenus).forEach(submenu => {
      submenu.addEventListener('click', () => {
        this.subMenuSelect(submenu)
      })
    })

    Array.from(this.closeButtons).forEach(button => {
      button.addEventListener('click', () => {
        this.subMenuClose()
      })
    })

    // UNDO
    $('#undo').addEventListener('click', () => {
      if (this.space.state.render.queue != null && this.space.state.render.queue.length > 0) {
        var last = this.space.state.render.queue.pop()
        this.space.state.undo.queue.push(last)
      }
    })

    // REDO
    $('#redo').addEventListener('click', () => {
      if (this.space.state.undo.queue != null && this.space.state.undo.queue.length > 0) {
        var last = this.space.state.undo.queue.pop()
        this.space.state.render.queue.push(last)
      }
    })
  }

  observeMouseEvents() {
    // HIDE menus on mouseover
    const menus = document.getElementsByClassName('menu')
    Array.from(menus).forEach(menu => {
      menu.addEventListener('mouseenter', () => {
        this.hide(menu)
      })
    })
  }

  resize() {
    // resize canvas and canvas-area
    const iw = window.innerWidth
    const ih = window.innerHeight
    this.space.c.width = iw
    this.space.c.height = ih
    this.space.ca.width = iw
    this.space.ca.height = ih
    // reposition all resizable menus
    this.menus.forEach(menu => {
      const menuDiv = $('#' + menu.id + '')
      menu.resize.x === true ? (menuDiv.style.left = iw / 2 - menuDiv.offsetWidth / 2 + 'px') : null
      menu.resize.y === true ? (menuDiv.style.top = ih / 2 - menuDiv.offsetHeight / 2 + 'px') : null
    })
  }

  clear(space) {
    space.state.render.queue = []
    space.state.undo.queue = []
    // space.ca.view.scl = 1
    space.randomizeBrushes(space.state.brush.randomCount)
  }

  log(space) {
    let itemCount = 0
    space.state.render.queue.forEach(item => {
      itemCount += item.items.length
    })
    const data = {
      space: space,
      objects: space.state.render.queue.length,
      items: itemCount,
      scl: space.ca.view.scl.toString().substring(0, 4),
      mouse: `x: ${space.state.mouse.x} y: ${space.state.mouse.y}`,
      cax: `${space.ca.view.x.toFixed(2)}`,
      cay: `${space.ca.view.y.toFixed(2)}`
    }
    console.log(this.space.state.brush)
  }

  save() {
    const url = this.space.c.toDataURL('image/png')
    const image = new Image()
    image.src = url
    var iframe = `<iframe width='100%' height='100%' src='${url}' style='margin:0px; padding:0px; border:0px; overflow:hidden'></iframe>`
    var x = window.open()
    x.document.open()
    x.document.write(iframe)
    x.document.close()
  }

  hide(menu) {
    if (this.space.state.isPainting) {
      menu.style.display = 'none'
      const hoverTimeout = setTimeout(() => {
        menu.style.display = 'block'
      }, 2500)
    }
  }

  subMenuSelect(button) {
    const messageDiv = $('#subMenu' + button.id + '')
    Array.from(this.submenus).forEach(subMenu => {
      if (subMenu.id == button.id) {
        messageDiv.style.display === 'block' ? (messageDiv.style.display = 'none') : (messageDiv.style.display = 'block')
      } else {
        $('#subMenu' + subMenu.id + '').style.display = 'none'
      }
    })
    this.resize() //
  }

  subMenuClose() {
    const messageMenu = document.getElementsByClassName('message')
    Array.from(messageMenu).forEach(message => {
      message.style.display = 'none'
    })
  }

  saveToLocalStorage() {
    localStorage.setItem('stars', JSON.stringify(this.space.state))
  }

  readFromLocalStorage() {
    const state = JSON.parse(localStorage.getItem('stars'))
    state ? (this.space.state = state) : null
  }
}
