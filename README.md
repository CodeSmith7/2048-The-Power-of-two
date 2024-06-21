# 2048 Game

## Introduction
2048 is a single-player sliding block puzzle game designed by Italian web developer Gabriele Cirulli. The game’s objective is to slide numbered tiles on a grid to combine them to create a tile with the number 2048.

## Gameplay
The game is played on a gray 4×4 grid, with numbered tiles that slide smoothly when a player moves them using the four arrow keys. Every turn, a new tile will randomly appear in an empty spot on the board with a value of either 2 or 4. Tiles slide as far as possible in the chosen direction until they are stopped by either another tile or the edge of the grid. If two tiles of the same number collide while moving, they will merge into a tile with the total value of the two tiles that collided. The resulting tile cannot merge with another tile again in the same move.

![2048_Game](https://github.com/CodeSmith7/2048-The-power-of-two/assets/138781677/65eb8bb9-4082-4d7f-8ea7-40021df896c0)

## Winning The Game
A scoreboard on the upper-right keeps track of the user’s score. The user’s score starts at zero, and is incremented whenever two tiles combine, by the value of the new tile. The game is won when a tile with a value of 2048 appears on the board, hence the name of the game. After reaching the 2048 tile, players can continue to play (beyond the 2048 tile) to reach higher scores.

## Losing The Game
The game is lost when there are no legal moves (there are no empty spaces and no adjacent tiles with the same value).

## Strategy
A good strategy to reach the 2048 tile is to keep the highest valued tile in the corner and not use that direction in which it can move out of that corner. If done successfully this will ensure that the highest valued tile is surrounded by smaller tiles.

## Conclusion
2048 is a game that requires strategic movement and decision-making. Even though the game’s rules are simple, the strategic depth of the game is quite impressive. Enjoy playing!
