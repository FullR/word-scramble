import spriteData from "./data";
const imagePath = require("./sprite.png");

function getSpriteStyle(sprite, {width, height}={}) {
  let styleWidth, styleHeight;
  const widthNum = typeof(width) === "number";
  const heightNum = typeof(height) === "number";

  if(widthNum && heightNum) {
    styleWidth = width;
    styleHeight = height;
  } else if(widthNum) {
    styleWidth = width;
    styleHeight = sprite.height * (width / sprite.width);
  } else if(heightNum) {
    styleHeight = height;
    styleWidth = sprite.width * (height / sprite.height);
  } else {
    styleWidth = sprite.width;
    styleHeight = sprite.height;
  }

  const bgXScale = styleWidth / sprite.width;
  const bgYScale = styleHeight / sprite.height;

  return {
    background: `url("${imagePath}") no-repeat`,
    backgroundPosition: `${sprite.x}px ${sprite.y}px`,
    width: sprite.width,
    height: sprite.height,
    transform: `scale(${bgXScale}, ${bgYScale})`,
    transformOrigin: "0 0"
  };
}

export default function resolveSprite(name, options) {
  if(spriteData.hasOwnProperty(name)) {
    return getSpriteStyle(spriteData[name], options);
  } else {
    throw new Error(`No sprite could be found with the name "${name}"`);
  }
}
