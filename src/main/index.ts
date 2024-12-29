/** 
 * @author By Bryant Ejorh - CodeByBryant
 * 
 * MIT License 2024
 * 
 * @fileoverview EvoSquares is a simple implementation of Evolutionary Squares using TypeScript and Canvas.
 * The agents move towards food and avoid obstacles, using a simple neural network for decision-making.

*/

/*
 * IMPORTS
 */

import AgentConfigData from './utilities/AgentConfig.json' assert { type: 'json' }
import { Agent, Food } from './Agent'
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

type canvasVariablesType = {
  getCanvas: () => HTMLCanvasElement
  getContext: () => CanvasRenderingContext2D
}

/** 
  * canvasVariables is used to avoid global variables and enhances code readability and maintainability.

*/
export const canvasVariables = (): canvasVariablesType => {
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  document.body.appendChild(canvas)

  const context: CanvasRenderingContext2D = canvas.getContext('2d')!

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  // Enable image smoothing for smoother lines
  context.imageSmoothingEnabled = true

  return {
    getCanvas: (): HTMLCanvasElement => canvas,
    getContext: (): CanvasRenderingContext2D => context
  }
}
;(function (): void {
  const agents: Agent[] = []
  const food: Food[] = []

  // Generate agents based on AgentConfigData
  ;(function (): void {
    const {
      AgentCount,
      DefaultAgentSize: { width, height },
      EnableRotation
    } = AgentConfigData

    for (let i = 0; i < AgentCount; i++) {
      const x = Math.random() * (window.innerWidth - 0) // Random x within spawn area
      const y = Math.random() * (window.innerHeight - 0) // Random y within spawn area

      const agent = new Agent(x, y, width, height)

      if (EnableRotation) {
        // Randomize rotation angle for each agent
        agent.rotate(Math.random() * 2 * Math.PI) // Random rotation in radians
      }

      // Store the agent in the list
      agents.push(agent)
    }

    // Generate food based on AgentConfigData
    for (let i = 0; i < AgentConfigData.FoodSettings.SpawnCount; i++) {
      const x = Math.random() * (window.innerWidth - 0) // Random x within spawn area
      const y = Math.random() * (window.innerHeight - 0) // Random y within spawn area

      food.push(new Food(x, y, Math.random() * 10 + 1))
    }
  })()

  // Animation loop
  const Update = (): void => {
    // Clear the canvas
    canvasVariables().getContext().fillStyle = 'black'
    canvasVariables()
      .getContext()
      .fillRect(0, 0, canvasVariables().getCanvas().width, canvasVariables().getCanvas().height)

    agents.forEach((agent) => {
      agent.update(agents)
      agent.render()
    })

    food.forEach((food) => {
      food.render()
    })

    // Continue the animation loop
    requestAnimationFrame(Update)
  }

  // Start the animation loop
  Update()
})() // Create a list to store the agents
