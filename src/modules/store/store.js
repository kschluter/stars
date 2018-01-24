export class Store {
  constructor() {
    this.confirmClear = false
    this.isPainting = false
    this.isQueuing = true
    this.menuToggle = { grid: false }
    this.mouse = { x: 0, y: 0 }
    this.notify = {
      help: false
    }
    this.brush = {
      randomCount: 10,
      flow: 40,
      spread: 60,
      selected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      all: [
        { c: 0, t: 0, h: 1, w: 1, r: 255, g: 255, b: 255, a: 1 },
        { c: 1, t: 0, d: 1, r: 67, g: 120, b: 22, a: 1 },
        { c: 2, t: 0, i: 3, o: 0.5, p: 7, r: 255, g: 255, b: 255, a: 1 },
        { c: 0, t: 0, h: 1, w: 1, r: 175, g: 0, b: 130, a: 1 }
      ]
    }
  }
}
