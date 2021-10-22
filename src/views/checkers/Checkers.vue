<script>
export default {
  data() {
    return {
      board: [
        ["", "Y", "", "Y", "", "Y", "", "Y"],
        ["Y", "", "Y", "", "Y", "", "Y", ""],
        ["", "Y", "", "Y", "", "Y", "", "Y"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["X", "", "X", "", "X", "", "X", ""],
        ["", "X", "", "X", "", "X", "", "X"],
        ["X", "", "X", "", "X", "", "X", ""],
      ],
    };
  },
  methods: {
    createBoard() {
      let list = 0;
      for (let i = 0; i < 8; i++) {
        const row = [];
        for (let j = 0; j < 8; j++) {
          row.push({ name: "", list: list });
          list++;
        }
        this.board.push(row);
      }
      console.log(this.board);
      return this.board;
    },
    // startDrag: (event, item) => {
    //   event.dataTransfer.dropEffect = "move";
    //   event.dataTransfer.effectAllowed = "move";
    //   event.dataTransfer.setData("itemID", item);
    // },
  },
};
</script>

<template>
  <h1>Checkers</h1>
  <div class="container">
    <div class="rows" :key="rowindex" v-for="(row, rowindex) in board">
      <div
        :key="colindex"
        v-for="(col, colindex) in row"
        v-bind:class="[
          (rowindex + colindex) % 2 === 1 ? 'field' : 'dark-field',
        ]"
      >
        <span v-if="board[rowindex][colindex] === 'X'">
          <i class="fas fa-times" />
        </span>
        <span v-else-if="board[rowindex][colindex] === 'Y'">
          <i class="far fa-circle"
        /></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  height: 95px;
  align-items: center;
  justify-content: center;
  border: 6px solid rgb(82, 73, 119);
  border-radius: 15px;
  cursor: pointer;
  margin: 3px;
}
.dark-field {
  display: flex;
  background: rgb(14, 5, 20);
  flex: 1;
  font-size: 80px;
  height: 95px;
  align-items: center;
  justify-content: center;
  border: 6px solid rgb(82, 73, 119);
  border-radius: 15px;
  cursor: pointer;
  margin: 3px;
}
</style>
