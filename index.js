const electron = require("electron")

const {app, BrowserWindow, Menu} = electron

let mainWindow // init the main window variable, this solves some scoping issue

app.on('ready', () => {
  console.log('app is ready')
  mainWindow = new BrowserWindow({})
  mainWindow.loadURL(`file://${__dirname}/main.html`)

  const mainMenu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(mainMenu)

})

const menuTemplate = [
   {
     label: 'File', // this appear as the app name on OSX
     submenu: [
       { label: 'Settings' },
       {
         label: 'Quit',
         accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q'
         click() {
           app.quit()
         }
       }
     ]
   }
]
