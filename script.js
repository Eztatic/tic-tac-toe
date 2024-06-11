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
      
      const getGameboard = () => {
            return gameBoard;
      }
      
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

      const checkWinner = (token) => {
            if(token === "X") {
                  Player1.score++;
                  console.log("X Win");
            }else if(token === "O") {
                  Player2.score++;
                  console.log("O Win");  
            }
            Player1.turn = false;
            Player2.turn = false;
            restartGameBoard();  
      }

      const checkPattern = () => {
            const checkLine = (a, b, c) => {
                  return a === b && b === c && a !== undefined;
            }

            // Row/Column Checker
            for(let cell = 0; cell < 3; cell++) {
                  if(checkLine(gameBoard[cell][0], gameBoard[cell][1], gameBoard[cell][2])){
                        checkWinner(gameBoard[cell][0]);
                        restartGameBoard();
                  }else if(checkLine(gameBoard[0][cell], gameBoard[1][cell], gameBoard[2][cell])){
                        checkWinner(gameBoard[0][cell]);
                        
                  };
            }

            // Diagonal Checker
            if(checkLine(gameBoard[0][0], gameBoard[1][1], gameBoard[2][2])){
                  checkWinner(gameBoard[1][1]);
            }else if(checkLine(gameBoard[0][2], gameBoard[1][1], gameBoard[2][0])){
                  checkWinner(gameBoard[1][1]);
            }

            const drawCheck = () => {
                  let turnCount = 0;
                  for(let i = 0; i < 3; i++) {
                        for(let j = 0; j < 3; j++) {
                              if(gameBoard[i][j] !== undefined) {
                                    turnCount++;
                              }
                        }
                  }
                  if(turnCount === 9) {
                        console.log("It's a draw");
                        restartGameBoard();
                  }      
            }
            drawCheck();
      };

      return {generateGameBoard, updateGameBoard, restartGameBoard, getGameboard, checkWinner};
})();

const Player1 = {
      token : "X",
      score : 0,
      turn: true
}

const Player2 = {
      token : "O",
      score : 0,
      turn: false
}

const player1Turn = (row, col) => {
      Player1.turn = false;
      Player2.turn = true;
      Gameboard.updateGameBoard(row, col, Player1.token);
}

const player2Turn = (row, col) => {
      Player1.turn = true;
      Player2.turn = false;
      Gameboard.updateGameBoard(row, col, Player2.token);
}

// const startGame = document.querySelector("button");
// startGame.addEventListener("click", (e) => {
//       e.preventDefault();
//       Player1.turn = true;
//       for(let p = 0; p < 9; p++){
//             if(Player1.turn === false && Player2.turn === false) {
//                   break;
//             }
//             let playerInput = prompt("Player 1/2:");
//             if(!playerInput) {break;}
//             const row = Number(playerInput[0]);
//             const col = Number(playerInput[1]);
//             // const [row, col] = playerInput.split(',').map(Number);
//             if(Player1.turn) {
//                   player1Turn(row, col);
//             }else {
//                   player2Turn(row, col);
//             }
//             console.table(Gameboard.getGameboard());
//       }
// });

const startRound = () => {
      Player1.turn = true;
      for(let p = 0; p < 9; p++){
            if(Player1.turn === false && Player2.turn === false) {
                  break;
            }
            let playerInput = prompt("Player 1/2:");
            if(!playerInput) {break;}
            const row = Number(playerInput[0]);
            const col = Number(playerInput[1]);
            if(Player1.turn) {
                  player1Turn(row, col);
            }else {
                  player2Turn(row, col);
            }
            console.table(Gameboard.getGameboard());
      }
}

// Testing
// Gameboard.updateGameBoard(0, 0, Player2["token"]);
// Gameboard.updateGameBoard(0, 1, Player1["token"]);
// Gameboard.updateGameBoard(0, 2, Player2["token"]);
// Gameboard.updateGameBoard(1, 0, Player2["token"]);
// Gameboard.updateGameBoard(1, 1, Player1["token"]);
// Gameboard.updateGameBoard(1, 2, Player2["token"]);
// Gameboard.updateGameBoard(2, 0, Player1["token"]);
// Gameboard.updateGameBoard(2, 1, Player2["token"]);
// Gameboard.updateGameBoard(2, 2, Player1["token"]);

// console.table(Gameboard.getGameboard());






