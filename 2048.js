import { AddNewSquare, Clear as ClearBoard, CountOccupiedSquares, GetBoard, GetEmptySquare } from './board.js';
import { DisplayBoard } from "./display.js";

const Initialize = () => {
    ClearBoard();
    while (CountOccupiedSquares() < 2) {
        AddNewSquare({...GetEmptySquare()})
    }
    DisplayBoard(GetBoard());
}

Initialize();
