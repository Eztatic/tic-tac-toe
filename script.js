const Gameboard = (() => {
      let gameBoard = [];
      let cellValue;

      const generateGameBoard = () => {
            for(let i = 0; i < 3; i++){
                  gameBoard[i] = [];
                  for(let j = 0; j < 3; j++){
                        gameBoard[i].push(undefined);
                  }
            }
      }

      generateGameBoard();
      
      const restartGameBoard = () => {
            gameBoard.length = 0;
            generateGameBoard();
      };

      const updateGameBoard = (a, b, c) => {
            if(gameBoard[a][b] === undefined) {
                  return gameBoard[a][b] = c;
            }
      };

      return {updateGameBoard, restartGameBoard, gameBoard};
})();

const Player1 = {
      token : "X",
      turn: false
}

const Player2 = {
      token : "O",
      turn: false
}

// Testing
Gameboard.updateGameBoard(0, 0, Player1["token"]);

console.table(Gameboard.gameBoard);

// Gameboard.restartGameBoard();

// Gameboard.updateGameBoard(0, 1, Player2["token"]);

// console.table(Gameboard.gameBoard);





