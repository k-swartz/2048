export const DisplayBoard = (GameBoard) => {
    document.getElementById('GameBoard').innerHTML = '';
    for (let i = 0; i < GameBoard.length; i++) {
        for (let j = 0; j < GameBoard[i].length; j++) {
            if (GameBoard[i][j].HasValue()) {
                const DivElement = document.createElement('div');
                DivElement.innerText = GameBoard[i][j].Value;
                DivElement.classList.add(`Value${GameBoard[i][j].Value}`);
                DivElement.style.gridRowStart = j + 1;
                DivElement.style.gridColumnStart = i + 1;
                document.getElementById('GameBoard').appendChild(DivElement);
            }
        }
    }
}

export const DisplayScore = (GameBoard) => {
    let TotalScore = 0;
    for (let i = 0; i < GameBoard.length; i++) {
        for (let j = 0; j < GameBoard[i].length; j++) {
            TotalScore += (GameBoard[i][j].HasValue() ? (Math.log2(GameBoard[i][j].Value) - 1) * GameBoard[i][j].Value : 0);
        }
    }
    document.getElementById('Score').innerText = `Score: ${TotalScore}`;
}