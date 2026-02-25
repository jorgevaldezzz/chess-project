const board = document.querySelector('.board');
const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

const boardState = {
    "A1": { type: "rook", color: "white", img: "pieces-icon/wr.png" },
    "B1": { type: "knight", color: "white", img: "pieces-icon/wn.png" },
    "C1": { type: "bishop", color: "white", img: "pieces-icon/wb.png" },
    "D1": { type: "queen", color: "white", img: "pieces-icon/wq.png" },
    "E1": { type: "king", color: "white", img: "pieces-icon/wk.png" },
    "F1": { type: "bishop", color: "white", img: "pieces-icon/wb.png" },
    "G1": { type: "knight", color: "white", img: "pieces-icon/wn.png" },
    "H1": { type: "rook", color: "white", img: "pieces-icon/wr.png" },
    "A2": { type: "pawn", color: "white", img: "pieces-icon/wp.png" },
    "B2": { type: "pawn", color: "white", img: "pieces-icon/wp.png" },
    "C2": { type: "pawn", color: "white", img: "pieces-icon/wp.png" },
    "D2": { type: "pawn", color: "white", img: "pieces-icon/wp.png" },
    "E2": { type: "pawn", color: "white", img: "pieces-icon/wp.png" },
    "F2": { type: "pawn", color: "white", img: "pieces-icon/wp.png" },
    "G2": { type: "pawn", color: "white", img: "pieces-icon/wp.png" },
    "H2": { type: "pawn", color: "white", img: "pieces-icon/wp.png" },
    "A7": { type: "pawn", color: "black", img: "pieces-icon/bp.png" },
    "B7": { type: "pawn", color: "black", img: "pieces-icon/bp.png" },
    "C7": { type: "pawn", color: "black", img: "pieces-icon/bp.png" },
    "D7": { type: "pawn", color: "black", img: "pieces-icon/bp.png" },
    "E7": { type: "pawn", color: "black", img: "pieces-icon/bp.png" },
    "F7": { type: "pawn", color: "black", img: "pieces-icon/bp.png" },
    "G7": { type: "pawn", color: "black", img: "pieces-icon/bp.png" },
    "H7": { type: "pawn", color: "black", img: "pieces-icon/bp.png" },
    "A8": { type: "rook", color: "black", img: "pieces-icon/br.png" },
    "B8": { type: "knight", color: "black", img: "pieces-icon/bn.png" },
    "C8": { type: "bishop", color: "black", img: "pieces-icon/bb.png" },
    "D8": { type: "queen", color: "black", img: "pieces-icon/bq.png" },
    "E8": { type: "king", color: "black", img: "pieces-icon/bk.png" },
    "F8": { type: "bishop", color: "black", img: "pieces-icon/bb.png" },
    "G8": { type: "knight", color: "black", img: "pieces-icon/bn.png" },
    "H8": { type: "rook", color: "black", img: "pieces-icon/br.png" }
};

let moveCounter = 1;
let highlightedSquares = new Set();
let selectedSquare = null;

function handleSquareClick(coord) {
    const currColor = (moveCounter % 2 === 0) ? "black" : "white";
    const piece = boardState[coord];

    if (selectedSquare === null) {
        if (piece && piece.color === currColor) {
            selectedSquare = coord;
            highlightedSquares = new Set();
            handleHighlightSquares(coord);
            renderBoard();
        }
    } else {
        if (coord === selectedSquare) {
            selectedSquare = null;
            highlightedSquares = new Set();
            renderBoard();
        } else if (piece && piece.color === boardState[selectedSquare].color) {
            selectedSquare = coord;
            highlightedSquares = new Set();
            handleHighlightSquares(coord);
            renderBoard();
        } else {
            boardState[coord] = boardState[selectedSquare];
            delete boardState[selectedSquare];
            selectedSquare = null;
            highlightedSquares = new Set();
            moveCounter++;
            renderBoard();
        }
    }
}

function handleHighlightSquares(coord) {
    const piece = boardState[coord];
    const file = coord.substring(0, 1);
    const rank = Number(coord.substring(1));

    if (piece.type === "pawn") {
        if (piece.color === "white") {
            highlightedSquares.add(file + (rank + 1));
        } else {
            highlightedSquares.add(file + (rank - 1));
        }
    }
}

function renderBoard() {
    board.innerHTML = '';
    for (let r = 0; r < ranks.length; r++) {
        for (let f = 0; f < files.length; f++) {
            const coord = files[f] + ranks[r];
            const button = document.createElement('button');
            button.className = ((r + f) % 2 === 0) ? 'white-tile' : 'black-tile';

            const piece = boardState[coord];
            if (piece) {
                const img = document.createElement('img');
                img.src = piece.img;
                button.appendChild(img);
            }

            if (coord === selectedSquare) {
                button.classList.add('selected-square');
            }

            button.addEventListener('click', () => {
                handleSquareClick(coord);
            });

            board.appendChild(button);
        }
    }
}

renderBoard();
