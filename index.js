const electron = require('electron')
const path = require('path')

const { app, BrowserWindow, Tray } = electron

let mainWindow
let tray

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false, //this makes the statusbar disappear
    resizable: false, // dont allow the user to resize the window
    show: false //  the bowser window initially not visible
  })
  mainWindow.loadURL(`file://${__dirname}/src/index.html`)

  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`)
  tray = new Tray(iconPath)
  tray.on('click', (event, bounds) => {
    console.log(bounds)

    //Click event bounds
    const  {x, y} = bounds
    //Window height and width
    const {height, width} = mainWindow.getBounds()


    if(mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.setBounds({
        x: x - width / 2,
        y,
        height,
        width
      })
      mainWindow.show()
      //mainWindow.
    }
  })
})
