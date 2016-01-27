import React from "react";
import onReady from "./on-ready";
import "babel-polyfill";

require("./index.html"); // Forces webpack to include our html file
require("file?name=[name].[ext]!./platform.js"); // Include platform.js for web (will be overwritten by Cordova merges)

function fatalError(error) {
  log.error("Uncaught error: " + error);
}

try {
  onReady().subscribe(() => {
    console.log("deviceready fired");
    require("./app");
  }, fatalError);
} catch(error) {
  fatalError(error);
}
