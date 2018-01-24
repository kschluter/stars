# Stars

> An app for painting and exporting star scenes. View <a href="https://kschluter.github.io/stars/">demo</a> here.

<img src="https://raw.githubusercontent.com/kschluter/stars/master/src/screenshot/screenshot.png" style="width:100%;">

The primary development goal of this project is to keep the build/download size (all css/js/images/html) as small as possible and not exceed 100K. No frameworks and few libraries as possible. Current build size is **under 50K**.

# Features

* Save scene as an image based on the size of your browser window (hit F11 then the save button to take a fullscreen capture)
* Paints 10 random stars on click+drag, zooms in and out on mouse wheel, pans on middle mouse
* Unlimited undo/redo of paint operations
* See <a href="https://github.com/kschluter/stars/blob/master/ROADMAP.md">roadmap</a> for details on future development and note regarding rendering performance

# Usage

```
# clone project
git clone https://github.com/schluter/stars.git

# install dependancies
npm install

# start developement server
npm run dev //=> localhost:1234

# create build
npm run build
```

# Credits

* <a href="https://github.com/goessner/canvas-area">canvas-area</a>

# License

<a href="https://raw.githubusercontent.com/kschluter/stars/master/LICENSE">MIT &copy; Kory Schluter</a>
