const winningOptions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
];

const isCenterOccupied = tiles => tiles[4] !== '';

const getMoveByPair = (tiles, tile) => {
    let moveIndex = false;

    winningOptions.forEach((options) => {
        const countOfUsed = options.filter(option => tiles[option] === tile).length;
        const countOfFree = options.filter(option => tiles[option] === '').length;

        if (countOfUsed === 2 && countOfFree === 1) {
            options.forEach((option) => {
                if (tiles[option] === '') {
                    moveIndex = option;
                }
            });
        }
    });

    if (moveIndex !== false) {
        return moveIndex;
    }

    return false;
};

export const getRendomMove = arr => arr[Math.floor(Math.random() * arr.length)];

const getSpecialIndex = (tiles) => {
    const oCount = tiles.filter(tile => tile === 'o').length;

    if (oCount === 1) {
        if (
            (tiles[1] === 'x' && tiles[4] === 'o' && tiles[3] === 'x')
            ||
            (tiles[5] === 'x' && tiles[4] === 'o' && tiles[7] === 'x')
        ) {
            return getRendomMove([2, 6]);
        }

        if (
            (tiles[1] === 'x' && tiles[4] === 'o' && tiles[5] === 'x')
            ||
            (tiles[3] === 'x' && tiles[4] === 'o' && tiles[7] === 'x')
        ) {
            return getRendomMove([0, 8]);
        }
    }

    return false;
};

const getRandomFreeCorner = (tiles) => {
    const freeCorners = [0, 2, 6, 8].filter(i => tiles[i] === '');

    if (freeCorners.length > 0) {
        return getRendomMove(freeCorners);
    }

    return false;
};

export const hasEmptyTile = tiles => tiles.some(tile => tile === '');

export const findWinner = (tiles) => {
    const xPositions = [];
    const oPositions = [];

    tiles.forEach((tile, index) => {
        if (tile === 'x') {
            xPositions.push(index);
        } else if (tile === 'o') {
            oPositions.push(index);
        }
    });

    let winner = '';

    winningOptions.forEach((option) => {
        if (option.every(el => xPositions.indexOf(el) > -1)) {
            winner = 'x';
        } else if (option.every(el => oPositions.indexOf(el) > -1)) {
            winner = 'o';
        }
    });

    return winner;
};

export const getRealMove = (tiles, freeTilesIndexes) => {
    if (!isCenterOccupied(tiles)) {
        return 4;
    }

    const oWinIndex = getMoveByPair(tiles, 'o');

    if (oWinIndex !== false) {
        return oWinIndex;
    }

    const xWinIndex = getMoveByPair(tiles, 'x');

    if (xWinIndex !== false) {
        return xWinIndex;
    }

    const specialMoveIndex = getSpecialIndex(tiles);

    if (specialMoveIndex !== false) {
        return specialMoveIndex;
    }

    const cornerIndex = getRandomFreeCorner(tiles);

    if (cornerIndex !== false) {
        return cornerIndex;
    }

    return getRendomMove(freeTilesIndexes);
};
