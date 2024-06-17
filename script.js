const GameBoard = () => {
      let gameBoard = [];

      const Cell = () => {
            let value = "";

            const isEmpty = () => value === "";
            const getValue = () => value;
            const setValue = (newValue) => { value = newValue }

            return {isEmpty, getValue, setValue};
      };

      const generateGameBoard = () => {
            gameBoard.length = 0;
            for(let i = 0; i < 3; i++){
                  gameBoard[i] = [];
                  for(let j = 0; j < 3; j++){
                        gameBoard[i].push(Cell());
                  }
            }
      };
      
      const getGameBoard = () => {
            return gameBoard;
      };
      
      const updateGameBoard = (row, col, token) => {
            if(gameBoard[row][col].isEmpty() === true) {
                  gameBoard[row][col].setValue(token);
                  return true;
            }else{
                  return false;
            }
      };

      const checkPattern = () => {
            const checkLine = (a, b, c) => {
                  return a.getValue() === b.getValue() && b.getValue() === c.getValue() && a.getValue() !== "";
            };

            // Row/Column Checker
            for(let cell = 0; cell < 3; cell++) {
                  if(checkLine(gameBoard[cell][0], gameBoard[cell][1], gameBoard[cell][2]) ||
                     checkLine(gameBoard[0][cell], gameBoard[1][cell], gameBoard[2][cell])){
                        return true
                  }
            }

            // Diagonal Checker
            if(checkLine(gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]) ||
               checkLine(gameBoard[0][2], gameBoard[1][1], gameBoard[2][0])){
                  return true;
            }
            return 
      };

      return {generateGameBoard, getGameBoard, updateGameBoard, checkPattern};
};

const GameController = () => {
      const Player1 = { token : "X", score : 0 };
      const Player2 = { token : "O", score : 0 };
      const theGameBoard = GameBoard();
      let gameStatus = false;
      let currentPlayer = Player1;
      let result;

      const getGameStatus = () => gameStatus;
      const getCurrentPlayer = () => currentPlayer;
      const getResult = () => result;
      const getPlayerScores = () => [Player1.score, Player2.score];

      const initiate = () => {
            gameStatus = true;
            theGameBoard.generateGameBoard();
      };

      const makeMove = (row, col) => {
            theGameBoard.updateGameBoard(row, col, currentPlayer.token);
      };

      const switchTurn = () => {
            currentPlayer = currentPlayer === Player1 ? Player2 : Player1;
      };

      const checkWinner = () => {
            if(theGameBoard.checkPattern()) {     
                  result = `${currentPlayer.token} Wins`;
                  currentPlayer.score++;
                  gameStatus = false;
            }else if(isDraw()){
                  result = 'Draw'; 
                  console.log(isDraw());
                  gameStatus = false;
            }else{
                  switchTurn();
            }
      };

      const isDraw = () => {
            return theGameBoard.getGameBoard().flat().every(cell => !cell.isEmpty());
      };

      return {initiate, getGameBoard: theGameBoard.getGameBoard, makeMove, getCurrentPlayer, checkWinner, getGameStatus, getResult, getPlayerScores};
}

const GameDisplay = () => {
      const game = GameController();
      const boardContainer = document.querySelector(".ttt-board-container")
      const announcer = document.querySelector("#announcer");
      const playAgain = document.querySelector("#play-again");
      const p1Score = document.querySelector("#p1Score");
      const p2Score = document.querySelector("#p2Score");
      
      game.initiate();

      const genCellUI = () => {
            game.getGameBoard().forEach((row, rowIndex) => {
                        row.forEach((col, colIndex) => {
                              const newDiv = document.createElement("div");
                              newDiv.classList.add("cells");
                              newDiv.dataset.cellID = `${rowIndex}${colIndex}`;   
                              boardContainer.appendChild(newDiv);
                  });
            });
      };
      genCellUI();

      boardContainer.addEventListener("click", (e) => {
            const selectedCell = e.target.dataset.cellID;
            if (!selectedCell) return;

            const [row, col] = selectedCell.split('').map(Number);
            game.makeMove(row, col);

            const img = document.createElement("img");
            img.src = game.getCurrentPlayer().token === "X" ? "./X.png" : "./O.png";
            e.target.appendChild(img);

            game.checkWinner();

            if(!game.getGameStatus()) {
                  announcer.innerText = game.getResult();
                  document.querySelectorAll(".cells").forEach((cell) => {
                        cell.style.pointerEvents = "none";
                  });
                  p1Score.innerText = game.getPlayerScores()[0];
                  p2Score.innerText = game.getPlayerScores()[1];
                  playAgain.style.display = "block";
            }else{
                  announcer.innerText = `${game.getCurrentPlayer().token}'s Turn`;
            }
      });

      playAgain.addEventListener("click", () => {
            boardContainer.innerHTML = "";
            game.initiate();
            genCellUI();
            announcer.innerText = `${game.getCurrentPlayer().token}'s Turn`;
            playAgain.style.display = "none";
      });
}

//Start Game
GameDisplay();
