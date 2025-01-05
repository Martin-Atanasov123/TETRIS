// const canvas = document.getElementById('tetris');
// const context = canvas.getContext('2d');
// const startButton = document.getElementById('startButton');
// const timerElement = document.getElementById('timer');
// const scoreElement = document.getElementById('score');

// context.scale(30, 30);

// const ROWS = 20;
// const COLS = 10;
// let dropCounter = 0;
// let dropInterval = 1000;
// let lastTime = 0;
// let gameTime = 0;
// let timerInterval;
// let gameStarted = false;
// let gameOver = false;
// let score = 0;
// let rowsCleared = 0;

// const COLORS = {
//     1: '#FF0000', // Red
//     2: '#00FF00', // Green
//     3: '#0000FF', // Blue
//     4: '#FFFF00', // Yellow
//     5: '#FF00FF', // Magenta
//     6: '#00FFFF', // Cyan
//     7: '#FFA500', // Orange
// };

// const BORDERS = {
//     1: '#8B0000', // Dark Red
//     2: '#006400', // Dark Green
//     3: '#00008B', // Dark Blue
//     4: '#9B870C', // Dark Yellow
//     5: '#8B008B', // Dark Magenta
//     6: '#008B8B', // Dark Cyan
//     7: '#FF4500', // Dark Orange
// };

// // Define pieces with all orientations
// const pieces = {
//     I: [
//         [[1, 1, 1, 1]], // Horizontal
//         [[1], [1], [1], [1]], // Vertical
//     ],
//     O: [
//         [[2, 2], [2, 2]], // Square
//     ],
//     T: [
//         [[0, 3, 0], [3, 3, 3]], // Base T-shape
//         [[3, 0], [3, 3], [3, 0]], // Rotated T
//         [[3, 3, 3], [0, 3, 0]], // Upside-down T
//         [[0, 3], [3, 3], [0, 3]], // Rotated T
//     ],
//     S: [
//         [[0, 4, 4], [4, 4, 0]], // Horizontal S
//         [[4, 0], [4, 4], [0, 4]], // Vertical S
//     ],
//     Z: [
//         [[5, 5, 0], [0, 5, 5]], // Horizontal Z
//         [[0, 5], [5, 5], [5, 0]], // Vertical Z
//     ],
//     L: [
//         [[6, 0, 0], [6, 6, 6]], // Horizontal L
//         [[6, 6], [6, 0], [6, 0]], // Vertical L
//         [[6, 6, 6], [0, 0, 6]], // Upside-down L
//         [[0, 6], [0, 6], [6, 6]], // Rotated L
//     ],
//     J: [
//         [[0, 0, 7], [7, 7, 7]], // Horizontal J
//         [[7, 0], [7, 0], [7, 7]], // Vertical J
//         [[7, 7, 7], [7, 0, 0]], // Upside-down J
//         [[7, 7], [0, 7], [0, 7]], // Rotated J
//     ],
// };

// // Create a piece with random orientation
// function createPiece(type) {
//     const piece = pieces[type];
//     return piece[Math.floor(Math.random() * piece.length)];
// }

// // Create the game matrix
// function createMatrix(width, height) {
//     const matrix = [];
//     while (height--) {
//         matrix.push(new Array(width).fill(0));
//     }
//     return matrix;
// }

// // Draw a matrix on the canvas
// function drawMatrix(matrix, offset) {
//     matrix.forEach((row, y) => {
//         row.forEach((value, x) => {
//             if (value !== 0) {
//                 context.fillStyle = COLORS[value];
//                 context.fillRect(x + offset.x, y + offset.y, 1, 1);
//                 context.strokeStyle = BORDERS[value];
//                 context.lineWidth = 0.05;
//                 context.strokeRect(x + offset.x, y + offset.y, 1, 1);
//             }
//         });
//     });
// }

// // Clear rows when full
// function arenaSweep() {
//     let rowCount = 1;
//     for (let y = arena.length - 1; y >= 0; y--) {
//         if (arena[y].every((value) => value !== 0)) {
//             arena.splice(y, 1); // Remove row
//             arena.unshift(new Array(COLS).fill(0)); // Add new row at the top
//             rowCount++;
//             rowsCleared++;
//             score += rowCount * 10;
//             scoreElement.textContent = `Score: ${score}`;
//             if (rowsCleared % 10 === 0) {
//                 dropInterval *= 0.9; // Increase speed
//             }
//             y++; // Recheck row
//         }
//     }
// }

// // Draw the game
// function draw() {
//     context.fillStyle = '#1e1e1e';
//     context.fillRect(0, 0, canvas.width, canvas.height);
//     drawMatrix(arena, { x: 0, y: 0 });
//     drawMatrix(player.matrix, player.pos);
// }

// // Game Update Loop
// function update(time = 0) {
//     if (gameOver) return;
//     const deltaTime = time - lastTime;
//     lastTime = time;

//     dropCounter += deltaTime;
//     if (dropCounter > dropInterval) {
//         playerDrop();
//     }

//     draw();
//     requestAnimationFrame(update);
// }

// // Drop the player piece
// function playerDrop() {
//     if (gameOver) return;
//     player.pos.y++;
//     if (collide(arena, player)) {
//         player.pos.y--;
//         merge(arena, player);
//         playerReset();
//         arenaSweep();
//         if (collide(arena, player)) {
//             stopGame();
//         }
//     }
//     dropCounter = 0;
// }

// // Check for collision
// function collide(arena, player) {
//     const [m, o] = [player.matrix, player.pos];
//     for (let y = 0; y < m.length; ++y) {
//         for (let x = 0; x < m[y].length; ++x) {
//             if (m[y][x] !== 0 &&
//                 (arena[y + o.y] &&
//                     arena[y + o.y][x + o.x]) !== 0) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }

// // Merge player piece into arena
// function merge(arena, player) {
//     player.matrix.forEach((row, y) => {
//         row.forEach((value, x) => {
//             if (value !== 0) {
//                 arena[y + player.pos.y][x + player.pos.x] = value;
//             }
//         });
//     });
// }

// // Start the game
// function startGame() {
//     if (!gameStarted || gameOver) {
//         resetGame();
//         playerReset();
//         gameTime = 0;
//         gameStarted = true;
//         gameOver = false;
//         update();
//         startTimer();
//     }
// }

// // Stop the game
// function stopGame() {
//     gameStarted = false;
//     gameOver = true;
//     clearInterval(timerInterval);
//     timerElement.textContent = 'Time: 0:00';
//     alert('Game Over!');
// }

// // Reset the game
// function resetGame() {
//     arena.forEach(row => row.fill(0));
//     player.pos = { x: 0, y: 0 };
//     player.matrix = null;
//     dropCounter = 0;
//     lastTime = 0;
//     gameTime = 0;
//     score = 0;
//     rowsCleared = 0;
//     dropInterval = 1000;
//     scoreElement.textContent = 'Score: 0';
// }

// // Start the timer
// function startTimer() {
//     clearInterval(timerInterval);
//     timerInterval = setInterval(() => {
//         gameTime++;
//         const minutes = Math.floor(gameTime / 60);
//         const seconds = gameTime % 60;
//         timerElement.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//     }, 1000);
// }

// // Initialize Player
// const arena = createMatrix(COLS, ROWS);
// const player = {
//     pos: { x: 0, y: 0 },
//     matrix: null,
// };

// function playerReset() {
//     const types = Object.keys(pieces);
//     player.matrix = createPiece(types[Math.floor(Math.random() * types.length)]);
//     player.pos.y = 0;
//     player.pos.x = Math.floor((arena[0].length - player.matrix[0].length) / 2);
//     if (collide(arena, player)) {
//         stopGame();
//     }
// }

// // Move the player piece
// function playerMove(dir) {
//     player.pos.x += dir;
//     if (collide(arena, player)) {
//         player.pos.x -= dir;
//     }
// }

// // Rotate the player piece
// function playerRotate() {
//     const pos = player.pos.x;
//     let offset = 1;
//     rotate(player.matrix);
//     while (collide(arena, player)) {
//         player.pos.x += offset;
//         offset = -(offset + (offset > 0 ? 1 : -1));
//         if (offset > player.matrix[0].length) {
//             rotate(player.matrix, -1);
//             player.pos.x = pos;
//             return;
//         }
//     }
// }

// // Rotate the matrix
// function rotate(matrix, dir = 1) {
//     for (let y = 0; y < matrix.length; ++y) {
//         for (let x = 0; x < y; ++x) {
//             [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
//         }
//     }
//     if (dir > 0) {
//         matrix.forEach(row => row.reverse());
//     } else {
//         matrix.reverse();
//     }
// }

// // Event listeners for keyboard inputs
// document.addEventListener('keydown', event => {
//     if (gameStarted) {
//         if (event.keyCode === 37) {
//             playerMove(-1); // Left arrow key
//         } else if (event.keyCode === 39) {
//             playerMove(1); // Right arrow key
//         } else if (event.keyCode === 40) {
//             playerDrop(); // Down arrow key
//         } else if (event.keyCode === 38) {
//             playerRotate(); // Up arrow key
//         }
//     }
// });

// startButton.addEventListener('click', startGame);

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');

context.scale(30, 30);

const ROWS = 20;
const COLS = 10;
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
let gameTime = 0;
let timerInterval;
let gameStarted = false;
let gameOver = false;
let score = 0;
let rowsCleared = 0;

const COLORS = {
    1: '#FF0000', // Red
    2: '#00FF00', // Green
    3: '#0000FF', // Blue
    4: '#FFFF00', // Yellow
    5: '#FF00FF', // Magenta
    6: '#00FFFF', // Cyan
    7: '#FFA500', // Orange
};

const BORDERS = {
    1: '#8B0000', // Dark Red
    2: '#006400', // Dark Green
    3: '#00008B', // Dark Blue
    4: '#9B870C', // Dark Yellow
    5: '#8B008B', // Dark Magenta
    6: '#008B8B', // Dark Cyan
    7: '#FF4500', // Dark Orange

};

// Define pieces with all orientations
const pieces = {
    I: [
        [[1, 1, 1, 1]], // Horizontal
        [[1], [1], [1], [1]], // Vertical
    ],
    O: [
        [[2, 2], [2, 2]], // Square
    ],
    T: [
        [[0, 3, 0], [3, 3, 3]], // Base T-shape
        [[3, 0], [3, 3], [3, 0]], // Rotated T
        [[3, 3, 3], [0, 3, 0]], // Upside-down T
        [[0, 3], [3, 3], [0, 3]], // Rotated T
    ],
    S: [
        [[0, 4, 4], [4, 4, 0]], // Horizontal S
        [[4, 0], [4, 4], [0, 4]], // Vertical S
    ],
    Z: [
        [[5, 5, 0], [0, 5, 5]], // Horizontal Z
        [[0, 5], [5, 5], [5, 0]], // Vertical Z
    ],
    L: [
        [[6, 0, 0], [6, 6, 6]], // Horizontal L
        [[6, 6], [6, 0], [6, 0]], // Vertical L
        [[6, 6, 6], [0, 0, 6]], // Upside-down L
        [[0, 6], [0, 6], [6, 6]], // Rotated L
    ],
    J: [
        [[0, 0, 7], [7, 7, 7]], // Horizontal J
        [[7, 0], [7, 0], [7, 7]], // Vertical J
        [[7, 7, 7], [7, 0, 0]], // Upside-down J
        [[7, 7], [0, 7], [0, 7]], // Rotated J
    ],
};

// Create a piece with random orientation
function createPiece(type) {
    const piece = pieces[type];
    return piece[Math.floor(Math.random() * piece.length)];
}

// Create the game matrix
function createMatrix(width, height) {
    const matrix = [];
    while (height--) {
        matrix.push(new Array(width).fill(0));
    }
    return matrix;
}

// Draw a matrix on the canvas
function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = COLORS[value];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
                context.strokeStyle = BORDERS[value];
                context.lineWidth = 0.05;
                context.strokeRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

// Clear rows when full
function arenaSweep() {
    let rowCount = 1;
    for (let y = arena.length - 1; y >= 0; y--) {
        if (arena[y].every((value) => value !== 0)) {
            arena.splice(y, 1); // Remove row
            arena.unshift(new Array(COLS).fill(0)); // Add new row at the top
            rowCount++;
            rowsCleared++;
            score += rowCount * 10;
            scoreElement.textContent = `Score: ${score}`;
            if (rowsCleared % 10 === 0) {
                dropInterval *= 0.9; // Increase speed
            }
            y++; // Recheck row
        }
    }
}

// Draw the game
function draw() {
    context.fillStyle = '#1e1e1e';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(arena, { x: 0, y: 0 });
    drawMatrix(player.matrix, player.pos);
}

// Game Update Loop
function update(time = 0) {
    if (gameOver) return;
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    draw();
    requestAnimationFrame(update);
}

// Drop the player piece
function playerDrop() {
    if (gameOver) return;
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        if (collide(arena, player)) {
            stopGame();
        }
    }
    dropCounter = 0;
}

// Check for collision
function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (arena[y + o.y] &&
                    arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

// Merge player piece into arena
function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

// Start the game
function startGame() {
    if (!gameStarted || gameOver) {
        resetGame();
        playerReset();
        gameTime = 0;
        gameStarted = true;
        gameOver = false;
        update();
        startTimer();
    }
}

// Stop the game
function stopGame() {
    gameStarted = false;
    gameOver = true;
    clearInterval(timerInterval);
    timerElement.textContent = 'Time: 0:00';
    alert(' 🎮 Game Over 🎮!');
}

// Reset the game
function resetGame() {
    arena.forEach(row => row.fill(0));
    player.pos = { x: 0, y: 0 };
    player.matrix = null;
    dropCounter = 0;
    lastTime = 0;
    gameTime = 0;
    score = 0;
    rowsCleared = 0;
    dropInterval = 1000;
    scoreElement.textContent = 'Score: 0';
}

// Start the timer
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        gameTime++;
        const minutes = Math.floor(gameTime / 60);
        const seconds = gameTime % 60;
        timerElement.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}

// Initialize Player
const arena = createMatrix(COLS, ROWS);
const player = {
    pos: { x: 0, y: 0 },
    matrix: null,
};

function playerReset() {
    const types = Object.keys(pieces);
    player.matrix = createPiece(types[Math.floor(Math.random() * types.length)]);
    player.pos.y = 0;
    player.pos.x = Math.floor((arena[0].length - player.matrix[0].length) / 2);
    if (collide(arena, player)) {
        stopGame();
    }
}

// Move the player piece
function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}

// Rotate the player piece
function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

// Rotate the matrix
function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                    matrix[y][x],
                    matrix[x][y],
                ];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

// Event listeners for keyboard inputs
document.addEventListener('keydown', event => {
    if (gameStarted) {
        if (event.keyCode === 37) {
            playerMove(-1); // Left arrow key
        } else if (event.keyCode === 39) {
            playerMove(1); // Right arrow key
        } else if (event.keyCode === 40) {
            playerDrop(); // Down arrow key
        } else if (event.keyCode === 38) {
            playerRotate(1); // Up arrow key
        }
    }
});

startButton.addEventListener('click', startGame);
