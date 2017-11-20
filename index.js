const electron = require('electron')
const path = require('path')
const TimerTray = require('./app/TimerTray')
const MainWindow = require('./app/MainWindow')

const { app, ipcMain } = electron

let mainWindow
let tray

app.on('ready', () => {
  mainWindow = new MainWindow()
  mainWindow.loadURL(`file://${__dirname}/src/index.html`)

  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`)
  tray = new TimerTray(iconPath, mainWindow) // we need the reference, otherwise the grabage collector kills the TimerTray object
})

ipcMain.on('update-timer', (event, timeLeft) => {
  tray.setTitle(timeLeft)
})
