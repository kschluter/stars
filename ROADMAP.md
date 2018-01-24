Listed below are some features either currently in development or planned at some point in the future:

* [ ] Implement "Brushes" - brushes allow modification of individual brush properties (type, size, color, transparency, flow and dispersion)
* [ ] Allow saving images based on total scene size (rather than current window size) or by preset sizes (dual/triple monitor setups)
* [ ] Save scene and brushes to local storage (done but disabled for the time being)
* [ ] \*Improve rendering performance
* [ ] Add mobile support
* [ ] Add unit/e2e tests

\* Framerate quickly drops depending on the number and type of stars added to a scene. Retaining the ability to zoom in and out of a scene without pixelation is preferred (may limit optimization techniques available). Currently considering options such as only rendering the stars on screen when scale is greater than 1 (user zoomed in) and rendering the queue to a single image if scale > 1 (zoomed out).

Pull requests are welcomed.
