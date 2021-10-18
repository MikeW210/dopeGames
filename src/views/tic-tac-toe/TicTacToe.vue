<template>
  <div>TicTacToe</div>
  <div v-if="whosTurn">X turn</div>
  <div v-else>O turn</div>
  <div>{{ numberOfTurns }}</div>
  <div class="rows" :key="rowindex" v-for="(row, rowindex) in board">
    <div
      @click="makeATurn(rowindex, colindex)"
      class="field"
      :key="colindex"
      v-for="(col, colindex) in row"
    >
      {{ board[rowindex][colindex] }}
    </div>
  </div>
  <div>
    <button @click="resetBoard">Reset</button>
  </div>
</template>

<script>
export default {
  name: "TicTacToe",
  data() {
    return {
      numberOfTurns: 0,
      whosTurn: "false",
      xBoard: [],
      oBoard: [],
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
    };
  },

  methods: {
    makeATurn(row, col) {
      const params = "" + row + col;
      if (this.whosTurn) {
        if (this.board[row][col] !== "") {
          alert("pole zajete");
        } else {
          this.xBoard.push(params);
          this.board[row][col] = "X";
          this.numberOfTurns++;
          this.whosTurn = !this.whosTurn;
          if (this.numberOfTurns >= 5) {
            this.checkForWinner();
          }
        }
      } else {
        if (this.board[row][col] !== "") {
          alert("pole zajete");
        } else {
          this.board[row][col] = "O";
          this.oBoard.push(params);
          this.numberOfTurns++;
          this.whosTurn = !this.whosTurn;
          if (this.numberOfTurns >= 5) {
            this.checkForWinner();
          }
        }
      }
    },
    checkForWinner() {
      const winningCombinations = [
        ["00", "01", "02"],
        ["10", "11", "12"],
        ["20", "21", "22"],
        ["00", "11", "22"],
        ["02", "11", "20"],
        ["00", "10", "20"],
        ["01", "11", "21"],
        ["02", "12", "22"],
      ];
      winningCombinations.forEach((wincomb) => {
        const [a, b, c] = wincomb;
        if (this.numberOfTurns < 9) {
          if (
            this.xBoard.includes(a) &&
            this.xBoard.includes(b) &&
            this.xBoard.includes(c)
          ) {
            alert("X won!");
            this.resetBoard();
          }
          if (
            this.oBoard.includes(a) &&
            this.oBoard.includes(b) &&
            this.oBoard.includes(c)
          ) {
            alert("O Won!");
            this.resetBoard();
          }
        } else {
          alert("draw!");
          this.resetBoard();
        }
      });
    },
    resetBoard() {
      (this.xBoard = []), (this.oBoard = []), (this.whosTurn = "false");
      this.numberOfTurns = 1;
      this.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
    },
  },
};
</script>

<style scoped>
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
  height: 150px;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  cursor: pointer;
}
</style>
