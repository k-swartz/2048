import { GetBoard, Move } from "./board.js";
import { DisplayBoard, DisplayScore } from "./display.js";

window.addEventListener('keydown', (event) => {
    event.preventDefault();
    switch (event.key) {
        case "ArrowUp":
            Move('Up');
            DisplayBoard(GetBoard());
            DisplayScore(GetBoard());
            break;
        case "ArrowDown":
            Move('Down');
            DisplayBoard(GetBoard());
            DisplayScore(GetBoard());
            break;
        case "ArrowLeft":
            Move('Left');
            DisplayBoard(GetBoard());
            DisplayScore(GetBoard());
            break;
        case "ArrowRight":
            Move('Right');
            DisplayBoard(GetBoard());
            DisplayScore(GetBoard());
            break;
    }
});

document.getElementById('StartOver').addEventListener('click', (event) => {
    event.preventDefault();
    window.location = window.location;
});
