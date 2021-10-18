<template>
  <div calss="whole-game">
    <h1>TicTacToe</h1>
    <div class="title">
      <p v-if="isTurnX">X turn</p>
      <p v-else>O turn</p>
      <p>Number of turns {{ numberOfTurns }}</p>
    </div>
    <div class="board">
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
  </div>
  <div>
    <button class="reset-button" @click="resetBoard">Reset</button>
  </div>
</template>

<script>
export default {
  name: "TicTacToe",
  data() {
    return {
      numberOfTurns: 0,
      isTurnX: "false",
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
      const params = [row, col].join();

      console.log(this.board);
      if (this.board[row][col] !== "") {
        alert("pole zajete");
      } else {
        if (this.isTurnX) {
          this.xBoard.push(params);
          this.board[row][col] = "X";
        } else {
          this.board[row][col] = "O";
          this.oBoard.push(params);
        }
        this.numberOfTurns++;
        this.isTurnX = !this.isTurnX;
      }
      if (this.numberOfTurns >= 5) {
        this.checkForWinner();
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
      this.xBoard = [];
      this.oBoard = [];
      this.isTurnX = "false";
      this.numberOfTurns = 0;
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
h1 {
  color: white;
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
.reset-button {
  padding: 0.3em 1.2em;
  margin: 1em;
  border: 0.16em solid rgba(255, 255, 255, 0);
  border-radius: 2em;
  box-sizing: border-box;
  background: rgb(23, 3, 97);
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #ffffff;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  text-align: center;
  transition: all 0.2s;
  box-shadow: 1px 1px 1px rgb(65, 58, 58);
  cursor: pointer;
}

.title {
  color: white;
  display: flex;
  justify-content: center;
  justify-content: space-around;
  font-size: 22px;
  font-weight: 600;
}
</style>
