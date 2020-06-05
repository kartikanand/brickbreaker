const PLATFORM_SPEED = 9;

const bricks = [];
let platform = null;
let ball = null;

function createBricks() {
  let y = 5;
  for (let k1 = 0; k1 < 7; ++k1) {
    let x = 5;
    for (let k2 = 0; k2 < 10; ++k2) {
      bricks.push(new Brick({ x, y }));
      x += 80;
    }

    y += 30;
  }
}

function createPlatform() {
  const px = 325;
  const py = 465;

  platform = new Platform({ x: px, y: py });
}

function createBall() {
  let bx = 400;
  let by = 450;
  let vx = 5;
  let vy = 5;

  ball = new Ball({ x: bx, y: by, vx, vy });
}

function setup() {
  createCanvas(805, 480);

  // create game assets
  createBricks();
  createPlatform();
  createBall();
}

function draw() {
  background(0);

  if (keyIsDown(LEFT_ARROW)) {
    platform.move({
      dx: -PLATFORM_SPEED,
      dy: 0
    });
  }

  if (keyIsDown(RIGHT_ARROW)) {
    platform.move({
      dx: PLATFORM_SPEED,
      dy: 0
    });
  }

  for (const brick of bricks) {
    brick.render();
  }

  platform.render();
  ball.render();

  ball.move();
  ball.checkCollision();
}