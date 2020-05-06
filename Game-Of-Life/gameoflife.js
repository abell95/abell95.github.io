const boardsize = 900;
const cellwidth = 9;

// aim for 100x100 grid
const cellcount = boardsize / cellwidth;

// 25% chance of being set "living" at start
const getRandomBoolean = () => {
    const rand = Math.random()
    if (rand > 0.75) {
        return true;
    } else {
        return false;
    }
}

const colorField = (cells, ctx) => {
    for (let i = 0; i < cellcount; i++) {
        for (let j = 0; j < cellcount; j++) {
            if (cells[i][j]) {
                ctx.fillStyle = "yellow";
                ctx.fillRect(j * cellwidth, i * cellwidth, cellwidth, cellwidth);
            }
        }
    }
}

const calculateAdjacent = (posX, posY, cells) => {
    let adj = 0;

    if (posX != 0 && posY != 0 && cells[posY - 1][posX - 1]) {
        adj++;
    }

    if (posY != 0 && cells[posY - 1][posX]) {
        adj++;
    }

    if (posY != 0 && posX != (cellcount - 1) && cells[posY - 1][posX + 1]) {
        adj++;
    }

    if (posX != 0 && cells[posY][posX - 1]) {
        adj++
    }

    if (posX != (cellcount - 1) && cells[posY][posX + 1]) {
        adj++;
    }

    if (posX != 0 && posY != (cellcount - 1) && cells[posY + 1][posX - 1]) {
        adj++;
    }

    if (posY != (cellcount - 1) && cells[posY + 1][posX]) {
        adj++;
    }

    if (posY != (cellcount - 1) && posX != (cellcount - 1) && cells[posY + 1][posX + 1]) {
        adj++;
    }

    return adj;
}

// copy full 2d array without any references - NO MUTATING!
const copyCells = (cells) => {
    const clone = [];
    // set up
    for (let i = 0; i < cellcount; i++) {
        let inner = [];
        for (let j = 0; j < cellcount; j++) {
            inner.push(false);
        }
        clone.push(inner)
    }

    // push values
    for (let i = 0; i < cellcount; i++) {
        for (let j = 0; j < cellcount; j++) {
            clone[i][j] = cells[i][j];
        }
    }
    return clone
}

const computeLiving = (cells) => {
    let tempCells = copyCells(cells);

    for (let i = 0; i < cellcount; i++) {
        for (let j = 0; j < cellcount; j++) {
            const adj = calculateAdjacent(j, i, cells);
            if (adj < 2 || adj > 3) {
                tempCells[i][j] = false; // cell is dead
            } else if (adj == 3 && cells[i][j] == false) { // three live neighbors of dead cell = living cell
                tempCells[i][j] = true; // cell is alive
            }
        }
    }

    return tempCells
}

window.onload = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let cells = [];

    for (let i = 0; i < cellcount; i++) {
        const cellRow = [];
        for (let j = 0; j < cellcount; j++) {
            cellRow.push(getRandomBoolean());
        }
        cells.push(cellRow);
    }

    canvas.width = boardsize;
    canvas.height = boardsize;

    const animate = () => {
        ctx.fillStyle = "#606060";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        cells = computeLiving(cells);
        colorField(cells, ctx);

        // half second long ticks
        setTimeout(() => {
            requestAnimationFrame(() => {
                animate();
            });
        }, 75);
    }

    animate();
};
