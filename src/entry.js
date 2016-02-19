import "babel-polyfill";
require("./index.html"); // Forces webpack to include our html file

function fatalError(error) {
  console.error("Uncaught error: " + error);
}

window.onload = () => {
  try {
    require("./app");
  } catch(error) {
    fatalError(error);
  }
};
