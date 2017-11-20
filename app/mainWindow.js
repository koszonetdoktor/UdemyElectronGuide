const electron = require('electron');

const { BrowserWindow } = electron

class MainWindow extends BrowserWindow {
  constructor(options) {
    super({ // not the best prctice. but these values are pretty hard-coded
      height: 500,
      width: 300,
      frame: false, //this makes the statusbar disappear
      resizable: false, // dont allow the user to resize the window
      show: false, //  the bowser window initially not visible
    //  webPreferences: { backgroundThrottling: false } // dont slow down the application even if it is not focused
     })
    this.on('blur', this.onBlur.bind(this))
  }

  onBlur() {
      this.hide()
  }
}

module.exports = MainWindow
