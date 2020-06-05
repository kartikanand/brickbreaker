const BRICK_WIDTH = 75;
const BRICK_HEIGHT = 25;

const PLATFORM_WIDTH = 100;
const PLATFORM_HEIGHT = 10;

const BALL_RADIUS = 10;

class Brick {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  render() {
    push();
    {
      fill('#904C77');
      noStroke();
      rect(this.x, this.y, BRICK_WIDTH, BRICK_HEIGHT);
    }
    pop();
  }
}

class Platform {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  checkBounds() {
    if ((this.x + PLATFORM_WIDTH) > width) {
      this.x = width - PLATFORM_WIDTH;
    } else if ((this.x) < 0) {
      this.x = 0;
    }
  }

  move({ dx, dy }) {
    this.x += dx;
    this.y += dy;

    this.checkBounds();
  }

  render() {
    push();
    {
      fill('#DA4167');
      noStroke();
      rect(this.x, this.y, PLATFORM_WIDTH, PLATFORM_HEIGHT);
    }
    pop();
  }
}

class Ball {
  constructor({ x, y, vx, vy }) {
    this.x = x;
    this.y = y;

    this.vx = vx;
    this.vy = vy;
  }

  checkCollision() {
    const hitPlatform = collideRectCircle(platform.x, platform.y,
      PLATFORM_WIDTH, PLATFORM_HEIGHT,
      this.x, this.y, 2 * BALL_RADIUS);

    if (hitPlatform) {
      this.vy = -this.vy;
      return;
    }

    for (let i = 0; i < bricks.length; ++i) {
      const brick = bricks[i];
      const hit = collideRectCircle(brick.x, brick.y,
        BRICK_WIDTH, BRICK_HEIGHT,
        this.x, this.y, 2 * BALL_RADIUS);

      if (hit) {
        bricks.splice(i, 1);
        this.vy = -this.vy;
      }
    }
  }

  checkBounds() {
    if ((this.x + BALL_RADIUS) > width) {
      this.x = width - BALL_RADIUS;
      this.vx = -this.vx;
    } else if ((this.x - BALL_RADIUS) < 0) {
      this.x = BALL_RADIUS;
      this.vx = -this.vx;
    } else if ((this.y + BALL_RADIUS) > height) {
      this.y = height - BALL_RADIUS;
      this.vy = -this.vy;
    } else if ((this.y - BALL_RADIUS) < 0) {
      this.y = BALL_RADIUS;
      this.vy = -this.vy;
    }
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    this.checkBounds();
  }

  render() {
    push();
    {
      fill('#FABC3C');
      noStroke();
      circle(this.x, this.y, 2 * BALL_RADIUS);
    }
    pop();
  }
}