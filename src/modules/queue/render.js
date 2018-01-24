export class Render {
  constructor() {
    this.queue = []
  }

  pop(value) {
    return this.queue.pop()
  }

  push(value) {
    return this.queue.push(value)
  }

  peek() {}
}
