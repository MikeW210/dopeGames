<template>
  <h1>AdvancedTicTacToe</h1>
  <form @submit="generateBoard">
    <input type="numper" v-model="numberOfRows" />
    <input type="number" v-model="numberOfColumns" />
    <input type="number" v-model="lengthOfWinningCombination" />
    <button type="submit">Start a game!</button>
  </form>
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
      isTurnX: false,
      numberOfRows: "",
      numberOfColumns: "",
      lengthOfWinningCombination: "",
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
      const winningLength = this.lengthOfWinningCombination;
      console.log("", rows, columns, winningLength);

      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
          row.push("");
        }
        this.board.push(row);
      }
      console.log(this.board);
    },
    makeATurn(row, col) {
      const params = "" + row + col;

      console.log(this.board);
      if (this.board[row][col] !== "") {
        alert("pole zajete");
      } else {
        if (this.isTurnX) {
          this.xBoard.push(params);
          this.board[row][col] = "X";
          console.log(this.xBoard);
        } else {
          this.oBoard.push(params);
          this.board[row][col] = "O";
          console.log(this.oBoard);
        }
        this.numberOfTurns++;
        this.isTurnX = !this.isTurnX;
        this.checkForWinner();
      }
      // if (this.numberOfTurns >= 2 * this.lengthOfWinningCombination - 1) {
      // }
    },
    checkForWinner() {
      this.xBoard.forEach((element) => {
        for (let i = 0; i < this.lengthOfWinningCombination; i++) {
          console.log(element);
        }
      });
    },
  },
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
