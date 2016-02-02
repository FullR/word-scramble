const fs = require("fs");
const sprity = require("sprity");
const css2json = require("css2json");


sprity.create({
  src: "./images/**/*.{png,jpg}",
  style: "./sprites.css",
  out: "./src/sprites"
}, (error) => {
  if(error) {
    console.error(error);
  }
  const icons = css2json(fs.readFileSync("./src/sprites/sprites.css").toString());
  const result = Object.keys(icons)
    .filter((key) => key !== ".icon")
    .map((key) => [key, icons[key]])
    .reduce((result, pair) => {
      const name = pair[0].replace(".icon-", "");
      const posStrings = pair[1]["background-position"].replace("px", "").split(" ");
      const x = parseInt(posStrings[0]);
      const y = parseInt(posStrings[1]);
      const width = parseInt(pair[1].width.replace("px", ""));
      const height = parseInt(pair[1].height.replace("px", ""));
      result[name] = {
        x: x || 0,
        y: y || 0,
        width: width || 0,
        height: height || 0
      };
      return result;
    }, {});

  fs.writeFileSync("./src/sprites/data.json", JSON.stringify(result, null, 2));
});
