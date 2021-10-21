<script>
export default {
  data() {
    return {
      board: [],
      oBoard: [],
      xBoard: [],
      isTurnX: false,
      numberOfRows: null,
      numberOfColumns: null,
      lengthOfWinningCombination: null,
      numberOfTurns: 0,
      isInProgress: true,
    };
  },
  methods: {
    generateBoard(numberOfRows, numberOfColumns) {
      for (let i = 0; i < numberOfRows; i++) {
        const row = [];
        for (let j = 0; j < numberOfColumns; j++) {
          row.push("");
        }
        this.board.push(row);
      }
    },
    makeATurn(row, col) {
      if (this.isInProgress) {
        const cell = `${row}${col}`;

        if (this.board[row][col] !== "") {
          alert("pole zajete");
        } else {
          if (this.isTurnX) {
            this.xBoard.push(cell);
            this.board[row][col] = "X";
          } else {
            this.oBoard.push(cell);
            this.board[row][col] = "O";
          }
          this.numberOfTurns++;

          if (this.numberOfTurns >= 2 * this.lengthOfWinningCombination - 1) {
            this.checkForWinner();
          }
          this.isTurnX = !this.isTurnX;
        }
      } else {
        console.log("koniec debilu xD");
      }
    },
    checkForWinner() {
      let counter = 0;

      const X = "X";
      const O = "O";

      const currentLetter = this.isTurnX ? X : O;

      counter = this.checkHorizontally(counter, currentLetter);

      if (counter !== this.lengthOfWinningCombination) {
        counter = this.checkVertically(counter, currentLetter);
      }

      if (counter !== this.lengthOfWinningCombination) {
        counter = this.checkDiagonallyRight(counter, currentLetter);
      }

      if (counter !== this.lengthOfWinningCombination) {
        counter = this.checkDiagonallyLeft(counter, currentLetter);
      }
    },
    checkHorizontally(length, letter) {
      for (
        let row = 0;
        row < this.numberOfRows - this.lengthOfWinningCombination + 1;
        row++
      ) {
        length = 0;
        for (let col = 0; col < this.numberOfColumns; col++) {
          if (this.board[row][col] === letter) {
            length++;
            console.log("poziomo");
          } else {
            length = 0;
          }
          if (length === this.lengthOfWinningCombination) {
            this.isInProgress = !this.isInProgress;
            alert("bajlando poziomo");
            break;
          }
        }
      }
      return length;
    },
    checkVertically(length, letter) {
      for (let col = 0; col < this.numberOfColumns; col++) {
        length = 0;
        for (let row = 0; row < this.numberOfRows; row++) {
          if (this.board[row][col] === letter) {
            length++;
            console.log("pionowo");
          } else {
            length = 0;
          }
          if (length === this.lengthOfWinningCombination) {
            this.isInProgress = !this.isInProgress;
            alert("bajlando pionowo");
            break;
          }
        }
      }
      return length;
    },
    checkDiagonallyRight(length, letter) {
      let adder = 0;

      for (let col = 0; col < this.numberOfColumns; col++) {
        for (let row = 0; row < this.numberOfRows; row++) {
          if (this.board[row][col + adder] === letter) {
            adder++;
            length++;
            console.log("skosnie prawo");
          } else {
            length = 0;
            adder = 0;
          }
          if (length === this.lengthOfWinningCombination) {
            this.isInProgress = !this.isInProgress;
            alert("bajlando skosnie w prawo");
            break;
          }
        }
      }
      return length;
    },
    checkDiagonallyLeft(length, letter) {
      let adder = 0;

      for (let col = 0; col < this.numberOfColumns; col++) {
        for (let row = 0; row < this.numberOfRows; row++) {
          if (this.board[row][col - adder] === letter) {
            adder++;
            length++;
            console.log("skosnie- lewo");
          } else {
            length = 0;
            adder = 0;
          }
          if (length === this.lengthOfWinningCombination) {
            this.isInProgress = !this.isInProgress;
            alert("bajlando skosnie w lewo");
            break;
          }
        }
      }
      return length;
    },
    resetBoard(numberOfRows, numberOfColumns, lengthOfWinningCombination) {
      this.board = [];
      this.oBoard = [];
      this.xBoard = [];
      this.isTurnX = false;
      this.numberOfRows = numberOfRows;
      this.numberOfColumns = numberOfColumns;
      this.lengthOfWinningCombination = lengthOfWinningCombination;
      this.numberOfTurns = 0;
      this.isInProgress = true;
    },
  },
};
</script>

<template>
  <h1>AdvancedTicTacToe</h1>
  <form class="form" @submit="generateBoard(numberOfRows, numberOfColumns)">
    <div class="inputs">
      <input type="number" v-model="numberOfRows" placeholder="Rows" />
      <input type="number" v-model="numberOfColumns" placeholder="Collumns" />
      <input
        type="number"
        v-model="lengthOfWinningCombination"
        placeholder="Length to win"
      />
    </div>
    <div class="buttons">
      <button class="button" type="submit">Start a game!</button>
      <button
        class="button"
        @click="
          resetBoard(numberOfRows, numberOfColumns, lengthOfWinningCombination)
        "
      >
        Reset Board!
      </button>
    </div>
  </form>
  <div class="statistics">
    <div>
      <span v-if="isTurnX">X turn</span>
      <span v-else>O turn</span>
    </div>
    <div>
      <span>Number of Turns: {{ numberOfTurns }}</span>
    </div>
  </div>
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

<style scoped>
h1 {
  color: white;
}
span {
  font-size: 1.5em;
  color: white;
  font-weight: 600;
}
.container {
  width: 100%;
}
.rows {
  display: flex;
  justify-content: center;
  justify-content: space-around;
  align-items: center;
  margin: 6px;
}
.field {
  display: flex;
  background: rgb(223, 183, 250);
  flex: 1;
  font-size: 80px;
  height: 150px;
  align-items: center;
  justify-content: center;
  border: 6px solid rgb(82, 73, 119);
  border-radius: 15px;
  cursor: pointer;
  margin: 3px;
}
.button {
  width: 9em;
  height: 3em;
  border-radius: 10px;
  background: rgb(93, 11, 170);
  box-shadow: 1px 1px 1px rgb(65, 58, 58);
  font-size: 1rem;
  letter-spacing: 0.08rem;
  position: relative;
  margin: 1em;
  cursor: pointer;
}
.form {
  display: flex;
  flex-direction: column;
}
.inputs {
  display: flex;
  justify-content: center;
  justify-content: space-evenly;
  min-width: none;
  padding-bottom: 10px;
}
input[type="number"] {
  font-size: 1.3em;
  background-color: rgb(223, 183, 250);
  /* background-position: 10px 10px; */
  background-repeat: no-repeat;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: hidden;
  outline: none;
  height: 40px;
  border-radius: 15px;
  box-shadow: 5px 13px 30px -10px rgba(66, 68, 90, 1);
}
.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.statistics {
  display: flex;
  justify-content: center;
  justify-content: space-evenly;
  padding: 10px;
}
</style>
