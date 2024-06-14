const GameBoard = () => {
      let gameBoard = [];

      const Cell = () => {
            let emptyValue = true;
            let value = "";

            const isEmpty = () => { return emptyValue; }
            const getValue = () => { return value; }
            const setValue = (newValue) => { 
                  value = newValue
                  if(value !== "") {
                        emptyValue = false;
                  }
            }

            return {isEmpty, getValue, setValue};
      }

      const generateGameBoard = () => {
            for(let i = 0; i < 3; i++){
                  gameBoard[i] = [];
                  for(let j = 0; j < 3; j++){
                        gameBoard[i].push(Cell());
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

      const updateGameBoard = (row, col, token) => {
            if(gameBoard[row][col].isEmpty() === true) {
                  gameBoard[row][col].setValue(token);
            }else{
                  console.log("Cell is occupied");
            }
      };

      const checkPattern = () => {
            const checkLine = (a, b, c) => {
                  const [aVal, bVal, cVal] = [a.getValue(), b.getValue(), c.getValue()];
                  return aVal === bVal && bVal === cVal && aVal !== "";
            };

            // Row/Column Checker
            for(let cell = 0; cell < 3; cell++) {
                  if(checkLine(gameBoard[cell][0], gameBoard[cell][1], gameBoard[cell][2])){
                        return true
                  }else if(checkLine(gameBoard[0][cell], gameBoard[1][cell], gameBoard[2][cell])){
                        return true;
                  }else{
                        console.log("No Pattern");
                  }
            }

            // Diagonal Checker
            if(checkLine(gameBoard[0][0], gameBoard[1][1], gameBoard[2][2])){
                  return true;
            }else if(checkLine(gameBoard[0][2], gameBoard[1][1], gameBoard[2][0])){
                  return true;
            }
      };

      return {generateGameBoard, getGameboard, updateGameBoard, restartGameBoard, checkPattern};
};

const GameController = () => {
      const Player1 = {
            token : "X",
            score : 0,
            turn: false
      }
      
      const Player2 = {
            token : "O",
            score : 0,
            turn: false
      }
 
      let gameStatus = false;
      let currentPlayer = Player1;

      const theGameBoard = GameBoard();

      const switchTurn = () => {
            if(currentPlayer === Player1){
                  Player1.turn = false;
                  Player2.turn = true;
                  currentPlayer = Player2
            }else if(currentPlayer === Player2){
                  Player1.turn = true;
                  Player2.turn = false;
                  currentPlayer = Player1;
            }
      }

      const playRound = (row, col) => {
            theGameBoard.updateGameBoard(row, col, currentPlayer.token);
      }

      const startGame = () => {
            gameStatus = true;
            theGameBoard.generateGameBoard();
            while(gameStatus) {
                  let input = prompt("Enter row and col (separated by a space)").split(' ');
                  let testRow = Number(input[0]);
                  let testCol = Number(input[1]);
                  playRound(testRow, testCol);
                  console.log(`${currentPlayer.token} is done`);
                  checkWinner(currentPlayer);
                  switchTurn();
            }
      }

      const checkWinner = (currPlayer) => {
            if(theGameBoard.checkPattern() === true) {
                  console.log(`${currPlayer.token} won the round`);
                  gameStatus = false;
                  Player1.turn = false;
                  Player2.turn = false;
                  theGameBoard.restartGameBoard(); 
            }else{
                  //Check if draw
                  let occupiedCell = 0;
                  theGameBoard.getGameboard().forEach((row) => {
                        row.forEach((cell) => {
                              if(cell.isEmpty() !== true) {
                                    occupiedCell++;
                              }
                        })
                  });
                  if(occupiedCell === 9) {
                        console.log("It's a draw");
                        gameStatus = false;
                        Player1.turn = false;
                        Player2.turn = false;
                        theGameBoard.restartGameBoard(); 
                  } 
            } 
      }

      return { startGame };
}

const newGame = GameController();
//newGame.startGame();

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

      // Player1.turn = true;
      // for(let p = 0; p < 9; p++){
      //       if(Player1.turn === false && Player2.turn === false) {
      //             break;
      //       }
      //       let playerInput = prompt("Player 1/2:");
      //       if(!playerInput) {break;}
      //       const row = Number(playerInput[0]);
      //       const col = Number(playerInput[1]);
      //       if(Player1.turn) {
      //             player1Turn(row, col);
      //       }else {
      //             player2Turn(row, col);
      //       }
      //       console.table(Gameboard.getGameboard());
      // }

// const checkWinner = (chkPattern = checkPattern(), currentPlayer) => {
      //       if(chkPattern === true) {
      //             console.log(`${currentPlayer.token} won the round`);
      //       }else{
      //             //Check if draw
      //             let occupiedCell = 0;
      //             gameBoard.forEach((row) => {
      //                   row.forEach((cell) => {
      //                         if(cell.isEmpty() !== true) {
      //                               occupiedCell++;
      //                         }
      //                   })
      //             });
      //             if(occupiedCell === 9) {
      //                   console.log("It's a draw");
      //             } 
      //       }
      //       Player1.turn = false;
      //       Player2.turn = false;
      //       restartGameBoard();  
      // }




