import { Space } from './modules/space.js'
import './index.scss'

window.onload = () => {
  const space = new Space()
  ;(function callRenderer() {
    space.render()
    requestAnimationFrame(callRenderer)
  })()
}
