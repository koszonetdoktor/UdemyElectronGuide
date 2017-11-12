const electron = require("electron")

const {app, BrowserWindow, Menu} = electron

let mainWindow // init the main window variable, this solves some scoping issue
let addWindow

app.on('ready', () => {
  console.log('app is ready')
  mainWindow = new BrowserWindow({})
  mainWindow.loadURL(`file://${__dirname}/main.html`)
  mainWindow.on('closed', () => app.quit())

  const mainMenu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(mainMenu)

})

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add New Todo'
  })
  addWindow.loadURL(`file://${__dirname}/add.html`)
  addWindow.on('closed', () => addWindow = null) // garbage collection !!
}

function clearTodos() {
  mainWindow.webContents.send('clear:todo')
}

const { ipcMain } = electron
ipcMain.on('todo:add', (event, todo) => {
  mainWindow.webContents.send('todo:add', todo)
  console.log("get the render msg: ", todo)
  addWindow.close()
})

const menuTemplate = [
   {
     label: 'File', // this appear as the app name on OSX
     submenu: [
       {
         label: 'New Todo',
         click() {
           createAddWindow()
         }
       },
       {
         label: 'Clear Todos',
         click() {
           clearTodos()
         }
       },
       { label: 'Settings' },
       {
         label: 'Quit',
         accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
         click() {
           app.quit()
         }
       }
     ]
   }
]

if(process.env.NODE_ENV  !== 'production') {
  menuTemplate.push({
    label: 'DEVELOPER',
    submenu: [
      { role: 'reload' },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Command+D' : 'Ctrl+D',
        click(item, focusedWindow) {
            focusedWindow.toggleDevTools()
        }
      }
    ]
  })
}
