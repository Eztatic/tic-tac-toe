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
                  gameBoard[a][b] = c;
                  checkPattern();
            }
      };

      const checkPattern = () => {
            const checkWinner = (token) => {
                  if(token === "X") {
                        console.log("X Win");
                  }else if(token === "O") {
                        console.log("O Win");
                  }
                  restartGameBoard();
            }

            const checkLine = (a, b, c) => {
                  return a === b && b === c && a !== undefined;
            }

            //Row/Column Checker
            for(let cell = 0; cell < 3; cell++) {
                  if(checkLine(gameBoard[cell][0], gameBoard[cell][1], gameBoard[cell][2])){
                        checkWinner(gameBoard[cell][0]);
                  }else if(checkLine(gameBoard[0][cell], gameBoard[1][cell], gameBoard[2][cell])){
                        checkWinner(gameBoard[0][cell]);
                  };
            }

            //Diagonal Checker
            if(checkLine(gameBoard[0][0], gameBoard[1][1], gameBoard[2][2])){
                  checkWinner(gameBoard[1][1]);
            }else if(checkLine(gameBoard[0][2], gameBoard[1][1], gameBoard[2][0])){
                  checkWinner(gameBoard[1][1]);
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

const gameFlow = {

}

// Testing
// Gameboard.updateGameBoard(0, 0, Player1["token"]);
// Gameboard.updateGameBoard(0, 1, Player2["token"]);
Gameboard.updateGameBoard(0, 2, Player1["token"]);
// Gameboard.updateGameBoard(1, 0, Player1["token"]);
Gameboard.updateGameBoard(1, 1, Player1["token"]);
// Gameboard.updateGameBoard(1, 2, Player2["token"]);
Gameboard.updateGameBoard(2, 0, Player1["token"]);
// Gameboard.updateGameBoard(2, 1, Player2["token"]);
Gameboard.updateGameBoard(2, 2, Player1["token"]);



console.table(Gameboard.gameBoard);


// Gameboard.restartGameBoard();

// Gameboard.updateGameBoard(0, 1, Player2["token"]);

// console.table(Gameboard.gameBoard);





