var board;
var score = 0;
const size = 4;

window.onload = function() {
    setGame();
    makeBoard();
    addTouchControls(); // Add this function call to initialize touch controls
};


function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 0, 0]
    ];
}

document.addEventListener('keydown', (event) => {
    // Prevent the default action (scroll / move caret)
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
    }
    handleKeyPress(event.key);
});

function handleKeyPress(key) {
    if (["w", "a", "s", "d", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"].includes(key)) {
        let moved = false;
        if (key === "w" || key === "ArrowUp") {
            moved = passMatrixUp();
        } else if (key === "s" || key === "ArrowDown") {
            moved = passMatrixDown();
        } else if (key === "a" || key === "ArrowLeft") {
            moved = passMatrixLeft();
        } else if (key === "d" || key === "ArrowRight") {
            moved = passMatrixRight();
        }
        if (moved) {
            updateBoard();
            generateRandom();
            isGameOver();
        }
    }
}


function makeBoard() {
    const boardElement = document.getElementById('board');
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const tile = document.createElement('div');
            tile.id = `${i * size + j}`;
            tile.className = 'tile';
            boardElement.appendChild(tile);
        }
    }
    updateBoard();
}

function updateBoard() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const tile = document.getElementById(`${i * size + j}`);
            tile.innerHTML = '';
            const value = board[i][j];
            if (value !== 0) {
                const tileContent = document.createElement('div');
                tileContent.innerHTML = value;
                tileContent.classList.add('tile', `x${value}`);
                tile.appendChild(tileContent);
            }
        }
    }
    document.getElementById('score').innerText = score;
}

function passMatrixLeft() {
    let moved = false;
    for (let i = 0; i < size; i++) {
        const newRow = modifyArray(board[i]);
        if (board[i].toString() !== newRow.toString()) {
            moved = true;
        }
        board[i] = newRow;
    }
    return moved;
}

function passMatrixRight() {
    let moved = false;
    for (let i = 0; i < size; i++) {
        const newRow = modifyArray(board[i].reverse());
        newRow.reverse();
        if (board[i].toString() !== newRow.toString()) {
            moved = true;
        }
        board[i] = newRow;
    }
    return moved;
}

function passMatrixUp() {
    let moved = false;
    for (let j = 0; j < size; j++) {
        let tmp = new Array(size);
        for (let i = 0; i < size; i++) {
            tmp[i] = board[i][j];
        }
        const newRow = modifyArray(tmp);
        for (let i = 0; i < size; i++) {
            if (board[i][j] !== newRow[i]) {
                moved = true;
            }
            board[i][j] = newRow[i];
        }
    }
    return moved;
}

function passMatrixDown() {
    let moved = false;
    for (let j = 0; j < size; j++) {
        let tmp = new Array(size);
        for (let i = 0; i < size; i++) {
            tmp[i] = board[size - i - 1][j];
        }
        const newRow = modifyArray(tmp);
        for (let i = 0; i < size; i++) {
            if (board[size - i - 1][j] !== newRow[i]) {
                moved = true;
            }
            board[size - i - 1][j] = newRow[i];
        }
    }
    return moved;
}

function modifyArray(oldArr) {
    let n = oldArr.length;
    let newArr = new Array(n).fill(0);
    let x = 0;
    for (let i = 0; i < n; i++) {
        if (oldArr[i] != 0) {
            oldArr[x] = oldArr[i];
            x++;
        }
    }
    n = x;
    if (x == 0)
        return oldArr;
    else if (x == 1) {
        newArr[0] = oldArr[0];
        return newArr;
    }

    oldArr = oldArr.slice(0, x);

    x = 0;
    for (let i = 0; i < n; i++) {
        if (i < n && oldArr[i] == oldArr[i + 1]) {
            newArr[x] = oldArr[i] * 2;
            score += oldArr[i]; //same block that added to score
            i++;
        } else {
            newArr[x] = oldArr[i];
        }
        x++;
    }
    return newArr;
}

function generateRandom() {
    let empty = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] == 0)
                empty.push((size * i) + j);
        }
    }
    if (empty.length > 0) {
        let pos1 = empty[Math.floor(Math.random() * empty.length)];
        board[Math.floor(pos1 / size)][pos1 % size] = 2;
        updateBoard();
    }
}

function isGameOver() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === 0) {
                return false;
            }
        }
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size - 1; j++) {
            if (board[i][j] === board[i][j + 1]) {
                return false;
            }
        }
    }

    for (let j = 0; j < size; j++) {
        for (let i = 0; i < size - 1; i++) {
            if (board[i][j] === board[i + 1][j]) {
                return false;
            }
        }
    }

    // No empty cells and no possible merges
    showGameOver();
    return true;
}

function showGameOver() {
    const gameOverDiv = document.getElementById('game-over');
    gameOverDiv.classList.remove('hidden');
}

// Add this event listener to reload the game when the retry button is clicked
document.getElementById('retry-button').addEventListener('click', () => {
    location.reload();
});


// Function to add touch controls
function addTouchControls() {
    const touchArea = document.body; // Use the body to cover the entire screen
    let touchStartX = 0;
    let touchStartY = 0;

    touchArea.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    touchArea.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > 0) {
                handleKeyPress('ArrowRight');
            } else {
                handleKeyPress('ArrowLeft');
            }
        } else {
            // Vertical swipe
            if (deltaY > 0) {
                handleKeyPress('ArrowDown');
            } else {
                handleKeyPress('ArrowUp');
            }
        }
    });

    // Prevent touch move event to avoid scrolling
    touchArea.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });
}

