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
      
      const getGameBoard = () => {
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
                  return false;
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
                  }
            }

            // Diagonal Checker
            if(checkLine(gameBoard[0][0], gameBoard[1][1], gameBoard[2][2])){
                  return true;
            }else if(checkLine(gameBoard[0][2], gameBoard[1][1], gameBoard[2][0])){
                  return true;
            }
      };

      return {generateGameBoard, getGameBoard, updateGameBoard, restartGameBoard, checkPattern};
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
      let result;

      const getGameStatus = () => {
            return gameStatus;
      }

      const getCurrentPlayer = () => {
            return currentPlayer;
      }

      const getResult = () => {
            return result;
      }

      const setGameStatus = (s) => {
            gameStatus = s;
      }

      const getPlayerScores = () => {
            return [Player1.score, Player2.score];
      }

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

      const initiate = () => {
            gameStatus = true;
            theGameBoard.generateGameBoard();
      }

      const checkWinner = (currPlayer) => {
            if(theGameBoard.checkPattern() === true) {
                  console.log(`${currPlayer.token} won the round`);      
                  Player1.turn = false;
                  Player2.turn = false;
                  theGameBoard.restartGameBoard(); 
                  gameStatus = false;
                  result = `${currPlayer.token} Wins`;
                  currPlayer.score++;
            }else{
                  //Check if draw
                  let occupiedCell = 0;
                  theGameBoard.getGameBoard().forEach((row) => {
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
                        gameStatus = false;
                        result = 'Draw';
                  } 
            } 
      }

      return {initiate, getGameBoard: theGameBoard.getGameBoard, playRound, switchTurn, checkWinner, getCurrentPlayer, getGameStatus, setGameStatus, getResult, getPlayerScores};
}

const GameDisplay = () => {
      const game = GameController();
      const boardContainer = document.querySelector(".ttt-board-container")
      const announcer = document.querySelector("#announcer");
      const playAgain = document.querySelector("#play-again");
      const p1Score = document.querySelector("#p1Score");
      const p2Score = document.querySelector("#p2Score");
      
      game.initiate();

      const board = game.getGameBoard();
      const genCellUI = () => {
            board.forEach((row, rowIndex) => {
                        row.forEach((col, colIndex) => {
                              const newDiv = document.createElement("div");
                              newDiv.classList.add("cells");
                              newDiv.dataset.cellID = `${rowIndex}${colIndex}`;   
                              boardContainer.appendChild(newDiv);
                  })
            })
      }
      genCellUI();

      playAgain.addEventListener("click", () => {
            //game.setGameStatus(true);
            boardContainer.innerHTML = "";
            game.initiate();
            genCellUI();
            announcer.innerText = `${game.getCurrentPlayer().token}'s Turn`;
            playAgain.style.display = "none";
      });

      boardContainer.addEventListener("click", (e) => {
            e.preventDefault();
            const selectedCell = e.target.dataset.cellID;

            if (!selectedCell) return;

            const row = Number(selectedCell[0]);
            const col = Number(selectedCell[1]);

            game.playRound(row, col);

            const img = document.createElement("img");
            if(game.getCurrentPlayer().token === "X") {
                  img.src = "./X.png";    
            }else{
                  img.src = "./O.png";
            }
            
            e.target.appendChild(img);
            game.checkWinner(game.getCurrentPlayer());
            if(game.getGameStatus() === false) {
                  announcer.innerText = game.getResult();
                  p1Score.innerText = game.getPlayerScores()[0];
                  p2Score.innerText = game.getPlayerScores()[1];
                  playAgain.style.display = "block";
                  return;
            }

            game.switchTurn();
            announcer.innerText = `${game.getCurrentPlayer().token}'s Turn`;
      });
}

//Start Game
GameDisplay();


