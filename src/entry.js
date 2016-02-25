import "babel-polyfill";
import {isElectron, isCordova} from "util/detect-platform";
require("./index.html"); // Forces webpack to include our html file

if(isElectron()) {
  console.log("Electron detected");
} else if(isCordova()) {
  console.log("Cordova detected");
} else {
  console.log("Web browser detected");
}

function fatalError(error) {
  console.error("Unhandled error: " + error);
  window.body.innerText = error.message || error.toString();
}

function app() {
  try {
    // all app code is run after onload/deviceready
    require("./app");
  } catch(error) {
    fatalError(error);
  }
}

if(isCordova) {
  document.addEventListener("deviceready", app, false);
} else {
  window.onload = app;
}
