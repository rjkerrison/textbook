# Games

Building games can be complicated, but it's also one of the best ways to test your understanding of what you can do with code.

In this section, we break down what you need to know.

## Visuals

Most websites are fairly static in their visuals. There may be a dozen boxes with borders or box shadows, there may be backgrounds and images, and there may even be videos to stream.

Games are more complicated. If you think of classic arcade or home console games like Pac-Man or Mario, the screen is heavily animated.

For very simple games, we can get away with moving images and positioning them.

For more complicated, fast-paced drawing, we need a stronger tool.

That's where `<canvas>` comes in.

## Collision Detection

Collision detection is the concept of understanding when two objects have touched.

It's an important part of platformer games like Sonic and Mario,
arcade games like Space Invaders and Pac-Man, and even mobile classics like Snake.
In every case, something about the game changes
when our hero collides with a villain or reaches a coin.

The magic of collision detection lies in mathematics and in coordinate systems.
If we know that the position 100 pixels from the left of the screen
and 50 pixels from the top is occupied both by Mario's right foot
and by a Koopa's head, we reason that Mario has kicked the living shit out of the little lizard.

In snake, we have a grid of, say, 50 squares on each side.
If my snake's head enters the same square where the food resides,
snake gets himself a meal, gets a square longer, and our score goes up.
If snake's head tries to move off the edge, it's game over.
In both cases, we need to detect whether the snake's next square is special in some way, and act accordingly.

Often, to simplify things, we assume everything exists in a rectangular box. We call this the _bounding box_.

If we want to check whether a position of a small object collides with our bounding box, we can check whether its coordinates fall within the confines of that box. We need to know its horizontal position lies between the left side and right side of the bounding box, and that its vertical position lies between the bottom side and top side.

```js
const mario = {
  boundingBox: {
    rightEdge: 5,
    leftEdge: 3,
    topEdge: 6,
    bottomEdge: 0
  },
  hasMoustache: true
}

const mushroom = {
  position: {x: 5, y: 4}
}

function isCollision(position, boundingBox) {
  if (position.x >= boundingBox.leftEdge
    && position.x <= boundingBox.rightEdge
    && position.y >= boundingBox.bottomEdge
    && position.y <= boundingBox.topEdge) {
    return true
  }
  return false
}

if (isCollision(mushroom.position, mario.boundingBox)) {
  // handle Mario/Mushroom collision
}
```

## Pong

To coach you through the world of games,
we have a few steps from a static drawing of a pong game,
all the way to a playable version with questionable bounce deflections.

Try making your own version of the first step, then when you're ready,
make the necessary improvements to reach the second step, and so on.
This is similar to how software developers work in real life:
starting with basics and improving code iteratively.

1. [Static ball and paddles](./pong-static-demo/index.html)
2. [Demo ball movement](./pong-demo/index.html)
3. [Moveable paddles](./pong-move-paddles/index.html)
4. [Calculated ball trajectory](./pong-trajectory/index.html)
5. [Playable](./pong-playable-original/index.html)
6. [Playable with deflections](./pong-playable-with-deflections/index.html)

