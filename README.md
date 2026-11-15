# Brick Breaker Xtreme

A classic brick breaker game for the browser, built with [p5.js](https://p5js.org/) and the p5.collide2D library.

## Play

No build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server
```

Controls: **Left** and **Right** arrow keys move the platform.

## Structure

- `js/assets.js`: the `Brick`, `Platform` and `Ball` classes
- `js/main.js`: p5 `setup`/`draw` loop, brick layout (7 rows of 10) and input handling
