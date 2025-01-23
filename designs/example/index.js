import { setTheme } from "./lib/index.js";

function draw(ctx, seed) {
  ctx.font = '25px serif';
  setTheme(ctx, 'default');
  seed.forEach((n, i) => ctx.fillText(n, 50, i * 25 + 25, 100));
}

export const schema = { draw, name: "Example", artist: "exampleartistname" };
