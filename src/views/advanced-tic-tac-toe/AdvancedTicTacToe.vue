<template>
  <h1>AdvancedTicTacToe</h1>
  <form @submit="generateBoard">
    <input type="numper" v-model="numberOfRows" />
    <input type="number" v-model="numberOfColumns" />
    <input type="number" v-model="lengthOfWinningCombination" />
    <button type="submit">Start a game!</button>
  </form>
  <p v-if="isTurnX">X turn</p>
  <p v-else>O turn</p>
  <div class="container">
    <div class="rows" :key="rowindex" v-for="(row, rowindex) in board">
      <div
        @click="makeATurn(rowindex, colindex)"
        class="field"
        :key="colindex"
        v-for="(col, colindex) in row"
      >
        <span v-if="board[rowindex][colindex] === 'X'">
          <i class="fas fa-times" />
        </span>
        <span v-else-if="board[rowindex][colindex] === 'O'">
          <i class="far fa-circle"
        /></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      board: [],
      oBoard: [],
      xBoard: [],
      xBoardHelper: [],
      xBoardCheck: [],
      isTurnX: false,
      numberOfRows: 5,
      numberOfColumns: 5,
      lengthOfWinningCombination: 2,
      nuberOfTurns: 0,
      isInProgress: false,
    };
  },
  methods: {
    generateBoard() {
      // if (this.isInProgress) {
      //   this.resetBoard();
      // }
      this.isInProgress = !this.isInProgress;
      console.log(this.isInProgress);
      const rows = this.numberOfRows;
      const columns = this.numberOfColumns;
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
          row.push("");
        }
        this.board.push(row);
      }
    },
    makeATurn(row, col) {
      const params = "" + row + col;
      if (this.board[row][col] !== "") {
        alert("pole zajete");
      } else {
        if (this.isTurnX) {
          this.xBoard.push(params);
          this.board[row][col] = "X";
        } else {
          this.oBoard.push(params);
          this.board[row][col] = "O";
        }
        this.numberOfTurns++;
        this.checkForWinner();
        this.isTurnX = !this.isTurnX;
      }
      // if (this.numberOfTurns >= 2 * this.lengthOfWinningCombination - 1) {
      // }
    },
    checkForWinner() {
      let numberOfX = 0;
      let numberOfO = 0;
      let rowAdder = 0;
      if (this.isTurnX) {
        for (let row = 0; row < this.numberOfRows; row++) {
          for (let col = 0; col < this.numberOfColumns; col++) {
            if (this.board[row][col] === "X") {
              numberOfX++;
              console.log("poziomo");
            } else {
              numberOfX = 0;
            }
            if (numberOfX === this.lengthOfWinningCombination) {
              alert("bajlando");
              break;
            }
          }
        }
        if (numberOfX !== this.lengthOfWinningCombination) {
          for (let col = 0; col < this.numberOfColumns; col++) {
            for (let row = 0; row < this.numberOfRows; row++) {
              if (this.board[row][col] === "X") {
                numberOfX++;
                console.log("pionowo");
              } else {
                numberOfX = 0;
              }
              if (numberOfX === this.lengthOfWinningCombination) {
                alert("bajlando");
                break;
              }
            }
          }
        }
        if (numberOfX !== this.lengthOfWinningCombination) {
          for (let col = 0; col < this.numberOfColumns; col++) {
            for (let row = 0; row < this.numberOfRows; row++) {
              if (this.board[row][col + rowAdder] === "X") {
                rowAdder++;
                numberOfX++;
                console.log("skosnie prawo");
              } else {
                numberOfX = 0;
                rowAdder = 0;
              }
              if (numberOfX === this.lengthOfWinningCombination) {
                alert("bajlando");
                break;
              }
            }
          }
        }
        if (numberOfX !== this.lengthOfWinningCombination) {
          for (let col = 0; col < this.numberOfColumns; col++) {
            for (let row = 0; row < this.numberOfRows; row++) {
              if (this.board[row][col - rowAdder] === "X") {
                rowAdder++;
                numberOfX++;
                console.log("skosnie- lewo");
              } else {
                numberOfX = 0;
                rowAdder = 0;
              }
              if (numberOfX === this.lengthOfWinningCombination) {
                alert("bajlando");
                break;
              }
            }
          }
        }
      }
      if (!this.isTurnX) {
        for (let row = 0; row < this.numberOfRows; row++) {
          for (let col = 0; col < this.numberOfColumns; col++) {
            if (this.board[row][col] === "O") {
              numberOfO++;
              console.log("poziomo");
            } else {
              numberOfO = 0;
            }
            if (numberOfO === this.lengthOfWinningCombination) {
              alert("bajlando");
              break;
            }
          }
        }
        if (numberOfO !== this.lengthOfWinningCombination) {
          for (let col = 0; col < this.numberOfColumns; col++) {
            for (let row = 0; row < this.numberOfRows; row++) {
              if (this.board[row][col] === "X") {
                numberOfO++;
                console.log("pionowo");
              } else {
                numberOfO = 0;
              }
              if (numberOfO === this.lengthOfWinningCombination) {
                alert("bajlando");
                break;
              }
            }
          }
        }
        if (numberOfO !== this.lengthOfWinningCombination) {
          for (let col = 0; col < this.numberOfColumns; col++) {
            for (let row = 0; row < this.numberOfRows; row++) {
              if (this.board[row][col + rowAdder] === "X") {
                rowAdder++;
                numberOfO++;
                console.log("skosnie prawo");
              } else {
                numberOfO = 0;
                rowAdder = 0;
              }
              if (numberOfO === this.lengthOfWinningCombination) {
                alert("bajlando");
                break;
              }
            }
          }
        }
        if (numberOfO !== this.lengthOfWinningCombination) {
          for (let col = 0; col < this.numberOfColumns; col++) {
            for (let row = 0; row < this.numberOfRows; row++) {
              if (this.board[row][col - rowAdder] === "X") {
                rowAdder++;
                numberOfO++;
                console.log("skosnie- lewo");
              } else {
                numberOfO = 0;
                rowAdder = 0;
              }
              if (numberOfO === this.lengthOfWinningCombination) {
                alert("bajlando");
                break;
              }
            }
          }
        }
      }
    },
  },
  // checkForWinner() {
  //   if (this.isTurnX) {
  //     for (let row = 0; row < this.numberOfRows; row++) {
  //       for (let col = 0; col < this.numberOfColumns; col++) {
  //         if (this.board[row][col] === "") {
  //           continue;
  //         } else {
  //           if (this.board[row][col] === "X") {
  //             for (let i = 1; i === this.lengthOfWinningCombination; i++) {}
  //           }
  //         }
  //       }
  //     }
  //   }
  // },
  // checkForWinner() {
  //   if (this.isTurnX) {
  //     this.xBoardCheck = [];
  //     this.xBoard.forEach((element) => {
  //       this.xBoardHelper = [];
  //       for (let i = 0; i < this.lengthOfWinningCombination; i++) {
  //         const combinationNextTo = parseInt(element) + i;
  //         this.xBoardHelper.push(combinationNextTo);
  //       }
  //       this.xBoardCheck.push(this.xBoardHelper);
  //     });
  //     console.log(this.xBoardCheck.length);
  //     console.log(this.xBoardCheck);
  //     for (let row = 0; row < this.xBoardCheck.length; row++) {
  //       for (let col = 0; col < this.lengthOfWinningCombination; col++) {
  //         this.xBoardCheck[col];
  //       }
  //     }
  //   } else {
  //     console.log("tura o");
  //   }
  // },
  // resetBoard() {
  //   this.board = [];
  //   this.numberOfRows = 0;
  //   this.numberOfColumns = 0;
  //   this.lengthOfWinningCombination = 0;
  //   this.isInProgress = false;
  // },
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%px;
}
.rows {
  display: flex;
  justify-content: center;
  justify-content: space-around;
  align-items: center;
  height: 150px;
  font-size: 30px;
}
.field {
  display: flex;
  flex: 1;
  font-size: 80px;
  height: 150px;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  cursor: pointer;
}
</style>
