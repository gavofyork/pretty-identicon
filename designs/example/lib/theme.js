import { shade } from "../../../utils.js";

const themes = {
  myTheme: {
    fillStyle: shade,
  }
};


const setTheme = (ctx, theme) => {
  if (ctx && themes[theme]) {
    ctx.fillStyle = themes[theme].fillStyle;
  }
}

export {
  setTheme,
}
