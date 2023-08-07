const {app, BrowserWindow, session} = require("electron");
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
  VUEJS_DEVTOOLS,
} from "electron-devtools-installer";
const path = require("path");
const os = require("os");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: "Minesweeper",
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.setMenuBarVisibility(false);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// const reactDevToolsPath = path.join(
//   os.homedir(),
//   "/AppData/Local/Microsoft/Edge/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.28.0_0"
// );
app.on("ready", createWindow);

app.on("ready", () => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => {
      console.log(`Added Extension: ${name}`);
      const win = BrowserWindow.getFocusedWindow();
      if (win) {
        win.webContents.on("did-frame-finish-load", () => {
          win.webContents.once("devtools-opened", () => {
            win.webContents.focus();
          });
          // open electron debug
          win.webContents.openDevTools();
        });
      }
    })
    .catch((err) => console.log("An error occurred: ", err));
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.