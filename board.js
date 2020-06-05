import { Square } from "./square.js";

const BoardSize = 4;
let GameBoard;

export const AddNewSquare = ({
    X,
    Y
} = {}, Value = 2) => {
    if (CountOccupiedSquares() === BoardSize * BoardSize) return;
    if (X === undefined || Y === undefined) return;
    GameBoard[X][Y] = new Square(Value);
}

export const Clear = () => {
    GameBoard = [];
    for (let i = 0; i < BoardSize; i++) {
        GameBoard[i] = [];
        for (let j = 0; j < BoardSize; j++) {
            GameBoard[i][j] = new Square(0);
        }
    }
}

export const CountOccupiedSquares = () => {
    let Total = 0;
    GameBoard.forEach((Row) => {
        Total += Row.filter((SquareInstance) => {
            return SquareInstance.HasValue();
        }).length;
    });
    return Total;
}

const IsOccupied = (Position) => {
    return GameBoard[Position.X][Position.Y].HasValue();
}

export const GetBoard = () => {
    return [...GameBoard];
}

export const GetEmptySquare = () => {
    if (CountOccupiedSquares() === BoardSize * BoardSize) return;
    let TestSquare = GetRandomPosition();
    while (IsOccupied(TestSquare)) {
        TestSquare = GetRandomPosition();
    }
    return TestSquare;
}

const GetRandomPosition = () => {
    return {
        X: Math.floor(Math.random() * BoardSize),
        Y: Math.floor(Math.random() * BoardSize)
    }
}

const RotateBoard = () => {
    let NewGameBoard = [];
    for (let i = 0; i < GameBoard.length; i++) {
        NewGameBoard[i] = [];
    }
    for (let i = 0; i < GameBoard.length; i++) {
        for (let j = 0; j < GameBoard.length; j++) {
            NewGameBoard[i][j] = GameBoard[BoardSize - j - 1][i];
        }
    }
    GameBoard = [...NewGameBoard];
}

const ClearMerges = () => {
    console.log(GameBoard);
    for (let i = 0; i < BoardSize; i++) {
        for (let j = 0; j < BoardSize; j++) {
            GameBoard[i][j].HasMerged = false;
        }
    }
    console.log(GameBoard);
}

export const MoveAllTiles = (PreRotates = 0, PostRotates = 0) => {
    let Moved = false;
    ClearMerges();
    for (let i = 0; i < PreRotates; i++) {
        RotateBoard();
    }
    let MovedIteration = true;
    while (MovedIteration) {
        MovedIteration = false;
        for (let i = 1; i <= BoardSize - 1; i++) {
            for (let j = 0; j <= BoardSize - 1; j++) {
                if (GameBoard[i][j].HasValue()) {
                    if (!GameBoard[i - 1][j].HasValue()) {
                        GameBoard[i - 1][j].Value = GameBoard[i][j].Value;
                        GameBoard[i - 1][j].MoveFrom({ X: i, Y: j });
                        GameBoard[i][j].Value = 0;
                        MovedIteration = true;
                        Moved = true;
                    }
                    if (GameBoard[i - 1][j].Value === GameBoard[i][j].Value && (GameBoard[i][j].HasMerged === undefined || GameBoard[i][j].HasMerged === false) && (GameBoard[i-1][j].HasMerged === undefined || GameBoard[i-1][j].HasMerged === false)) {
                        GameBoard[i - 1][j].Merge();
                        GameBoard[i][j] = new Square();
                        Moved = true;
                    }
                }                
            }
        }
    }
    for (let i = 0; i < PostRotates; i++) {
        RotateBoard();
    }
    return Moved;
}

export const Move = (Direction) => {
    let Moved = false;
    switch (Direction) {
        case "Up":
            if (MoveAllTiles(1, 3)) {
                Moved = true;
            }
            break;
        case "Down":
            if (MoveAllTiles(3, 1)) {
                Moved = true;
            }
            break;
        case "Right":
            if (MoveAllTiles(2, 2)) {
                Moved = true;
            }
            break;
        case "Left":
            if (MoveAllTiles(0, 0)) {
                Moved = true;
            }
            break;
    }
    if (Moved) {
        AddNewSquare(GetEmptySquare());
    }
}

Clear();