<script>
export default {
  data() {
    return {
      board: [],
    };
  },
  methods: {
    createBoard() {
      let id = 0;
      for (let i = 0; i < 8; i++) {
        const row = [];
        for (let j = 0; j < 8; j++) {
          if (i < 3) {
            if ((i + j) % 2 === 1) {
              row.push({ name: "Y", id: id });
            } else {
              row.push({ name: "", id: id });
            }
          }
          if (i === 3 || i === 4) {
            row.push({ name: "", id: id });
          }
          if (i > 4) {
            if ((i + j) % 2 === 1) {
              row.push({ name: "X", id: id });
            } else {
              row.push({ name: "", id: id });
            }
          }
          id++;
        }
        this.board.push(row);
      }
      console.log(this.board);
    },
    startDrag(event, board, rowindex, colindex) {
      console.log(board[rowindex][colindex]);
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("fieldName", board[rowindex][colindex].name);
      event.dataTransfer.setData("fieldID", board[rowindex][colindex].id);
      event.dataTransfer.setData("column", colindex);
      event.dataTransfer.setData("row", rowindex);
    },
    onDrop(event, board, rowindex, colindex) {
      console.log("board id na poczatku upadku", board[rowindex][colindex].id);

      const itemName = event.dataTransfer.getData("fieldName");
      const fieldId = event.dataTransfer.getData("fieldID");
      const column = parseInt(event.dataTransfer.getData("column"));
      const row = parseInt(event.dataTransfer.getData("row"));
      if ((rowindex + colindex) % 2 === 0) {
        console.log("nie mozesz tego zrobic");
      } else if (
        board[rowindex][colindex].name !== itemName &&
        board[rowindex][colindex].name !== ""
      ) {
        alert("nie mozesz postawic pionka na pionku przeciwnika");
      } else if (board[rowindex][colindex].name === itemName) {
        alert("nie stawiaj swojego pionka na swoim pionku");
        // } else if (
        //   rowindex === row + 2 &&
        //   colindex === column + 2 &&
        //   board[row + 1][column + 1].name !== itemName &&
        //   board[row + 1][column + 1].name !== ""
        // ) {
        //   //bicie dol prawo
        //   const originalField = this.findOldField(fieldId);
        //   console.log("zajebiscie");
        //   originalField.name = "";
        //   board[rowindex][colindex].name = itemName;
        //   board[row + 1][column + 1].name = "";
        // } else if (
        //   rowindex === row + 2 &&
        //   colindex === column - 2 &&
        //   board[row + 1][column - 1].name !== itemName &&
        //   board[row + 1][column - 1].name !== ""
        // ) {
        //   //bicie dol lewo
        //   const originalField = this.findOldField(fieldId);
        //   console.log("zajebiscie");
        //   originalField.name = "";
        //   board[rowindex][colindex].name = itemName;
        //   board[row + 1][column - 1].name = "";
        // } else if (
        //   rowindex === row - 2 &&
        //   colindex === column + 2 &&
        //   board[row - 1][column + 1].name !== itemName &&
        //   board[row - 1][column + 1].name !== ""
        // ) {
        //   //bicie gora prawo
        //   const originalField = this.findOldField(fieldId);
        //   console.log("zajebiscie");
        //   originalField.name = "";
        //   board[rowindex][colindex].name = itemName;
        //   board[row - 1][column + 1].name = "";
        // } else if (
        //   rowindex === row - 2 &&
        //   colindex === column - 2 &&
        //   board[row - 1][column - 1].name !== itemName &&
        //   board[row - 1][column - 1].name !== ""
        // ) {
        //   // bicie gora lewo
        //   const originalField = this.findOldField(fieldId);
        //   console.log("zajebiscie");
        //   originalField.name = "";
        //   board[rowindex][colindex].name = itemName;
        //   board[row - 1][column - 1].name = "";
      } else {
        if (
          Math.abs(rowindex - row) === 2 ||
          Math.abs(colindex - column) === 2
        ) {
          this.checkForCapturingAPawn(
            rowindex,
            colindex,
            board,
            column,
            row,
            itemName,
            fieldId
          );
        } else if (
          Math.abs(rowindex - row) > 1 ||
          Math.abs(colindex - column) > 1
        ) {
          alert("nie mozesz robic ruchow o wiecej niz 1 pole");
        } else {
          const originalField = this.findOldField(fieldId);
          console.log(originalField);
          originalField.name = "";
          board[rowindex][colindex].name = itemName;

          console.log("field po przypisaniu", board[rowindex][colindex]);
        }
      }
    },
    findOldField(id) {
      let oldField;

      this.board.forEach((row) => {
        const foundField = row.find((field) => field.id === +id);
        if (foundField) {
          oldField = foundField;
          return;
        }
      });

      return oldField;
    },
    checkForCapturingAPawn(
      rowindex,
      colindex,
      board,
      column,
      row,
      itemName,
      fieldId
    ) {
      debugger;
      if (
        rowindex === row + (rowindex - row) &&
        colindex === column + (colindex - column) &&
        board[row + (rowindex - row) / 2][column + (colindex - column) / 2]
          .name !== itemName &&
        board[row + (rowindex - row) / 2][column + (colindex - column) / 2]
          .name !== ""
      ) {
        const originalField = this.findOldField(fieldId);
        console.log("zajebiscie");
        originalField.name = "";
        board[rowindex][colindex].name = itemName;
        board[row + (rowindex - row) / 2][
          column + (colindex - column) / 2
        ].name = "";
      }
    },
  },
};
// checkForMoves(field, board) {
//   console.log(field);
//   for (let i = 0; i < 8; i++) {
//     for (let j = 0; j < 8; j++) {
//       if (board[i][j] === field) {
//         if (
//           board[i + 1][j - 1].id === field.id + 7 &&
//           board[i + 1][j - 1].name === ""
//         ) {
//           board[i + 1][j - 1].name = j + 1;
//           console.log(board);
//         }
//       }
//     }
//   }
// },
</script>

<template>
  <h1>Checkers</h1>
  <button @click="createBoard">Nakurwiaj wegoza</button>
  <div class="container">
    <div class="rows" :key="rowindex" v-for="(row, rowindex) in board">
      <div
        :key="colindex"
        v-for="(col, colindex) in row"
        @drop="onDrop($event, board, rowindex, colindex)"
        @dragenter.prevent
        @dragover.prevent
        v-bind:class="[
          (rowindex + colindex) % 2 === 1 ? 'field' : 'dark-field',
        ]"
      >
        <span
          @click="checkForMoves(board[rowindex][colindex], board)"
          v-if="board[rowindex][colindex].name === 'X'"
        >
          <i
            draggable="true"
            @dragstart="startDrag($event, board, rowindex, colindex)"
            class="fas fa-times"
          />
        </span>
        <span
          @click="checkForMoves(board[rowindex][colindex], board)"
          v-else-if="board[rowindex][colindex].name === 'Y'"
        >
          <i
            draggable="true"
            @dragstart="startDrag($event, board, rowindex, colindex)"
            class="far fa-circle"
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
.jasny {
  display: flex;
  background: rgb(189, 187, 190);
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
