<template>
  <h1>AdvancedTicTacToe</h1>
  <form @submit="generateBoard">
    <input type="numper" v-model="numberOfRows" />
    <input type="number" v-model="numberOfColumns" />
    <input type="number" v-model="lengthOfWinningCombination" />
    <button type="submit">Start a game!</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      board: [],
      numberOfRows: "",
      numberOfColumns: "",
      lengthOfWinningCombination: "",
    };
  },
  methods: {
    generateBoard() {
      const rows = this.numberOfRows;
      const columns = this.numberOfColumns;
      const winningLength = this.lengthOfWinningCombination;
      console.log("", rows, columns, winningLength);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          this.board.push([i, j]);
        }
      }
      console.log(this.board);
      this.numberOfRows = "";
      this.numberOfColumns = "";
      this.lengthOfWinningCombination = "";
    },
  },
};
</script>
<style scoped></style>
