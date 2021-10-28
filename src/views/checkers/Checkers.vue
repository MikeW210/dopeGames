<script>
export default {
  data() {
    return {
      isYTurn: true,
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
      if (this.isYTurn && board[rowindex][colindex].name === "Y") {
        console.log(board[rowindex][colindex]);
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("fieldName", board[rowindex][colindex].name);
        event.dataTransfer.setData("fieldID", board[rowindex][colindex].id);
        event.dataTransfer.setData("column", colindex);
        event.dataTransfer.setData("row", rowindex);
      } else if (!this.isYTurn && board[rowindex][colindex].name === "X") {
        console.log(board[rowindex][colindex]);
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("fieldName", board[rowindex][colindex].name);
        event.dataTransfer.setData("fieldID", board[rowindex][colindex].id);
        event.dataTransfer.setData("column", colindex);
        event.dataTransfer.setData("row", rowindex);
      } else {
        alert("nie twoja tura!");
      }
    },
    onDrop(event, board, newRowIndex, newColIndex) {
      console.log(
        "board id na poczatku upadku",
        board[newRowIndex][newColIndex].id
      );

      const oldFieldName = event.dataTransfer.getData("fieldName");
      const oldFieldId = event.dataTransfer.getData("fieldID");
      const oldColIndex = parseInt(event.dataTransfer.getData("column"));
      const oldRowIndex = parseInt(event.dataTransfer.getData("row"));
      if (!this.checkIfMovedBackwards(newRowIndex, oldRowIndex, oldFieldName)) {
        if (this.checkIfMovedOnDiferentColorOfField(newRowIndex, newColIndex)) {
          console.log("nie mozesz tego zrobic");
        } else if (
          this.checkIfMovedOnEnemyPawn(
            board,
            newRowIndex,
            newColIndex,
            oldFieldName
          )
        ) {
          alert("nie mozesz postawic pionka na pionku przeciwnika");
        } else if (
          this.checkIfMovedOnFriendlyPawn(
            board,
            newRowIndex,
            newColIndex,
            oldFieldName
          )
        ) {
          alert("nie stawiaj swojego pionka na swoim pionku");
        } else {
          if (
            Math.abs(newRowIndex - oldRowIndex) === 2 &&
            Math.abs(newColIndex - oldColIndex) === 2
          ) {
            this.captureAPawn(
              newRowIndex,
              newColIndex,
              board,
              oldColIndex,
              oldRowIndex,
              oldFieldName,
              oldFieldId
            );
          } else if (
            this.checkIfMovedFormoreThanOneField(
              newRowIndex,
              oldRowIndex,
              newColIndex,
              oldColIndex
            )
          ) {
            alert("nie mozesz robic ruchow o wiecej niz 1 pole");
          } else {
            const originalField = this.findOldField(oldFieldId);
            originalField.name = "";
            board[newRowIndex][newColIndex].name = oldFieldName;
            this.isYTurn = !this.isYTurn;
          }
          this.checkForCapturingAPawn();
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
    captureAPawn(
      newRowIndex,
      newColIndex,
      board,
      oldColIndex,
      oldRowIndex,
      oldFieldName,
      oldFieldId
    ) {
      if (
        this.movedOverEnemyPawn(
          newRowIndex,
          oldRowIndex,
          newColIndex,
          oldColIndex,
          oldFieldName,
          board
        )
      ) {
        const originalField = this.findOldField(oldFieldId);
        console.log("zajebiscie");
        originalField.name = "";
        board[newRowIndex][newColIndex].name = oldFieldName;
        board[oldRowIndex + (newRowIndex - oldRowIndex) / 2][
          oldColIndex + (newColIndex - oldColIndex) / 2
        ].name = "";
      } else {
        alert("nie mozesz poruszac sie wiecej o 1 pole jak nie bijesz");
      }
    },
    checkIfMovedBackwards(newRowIndex, oldRowIndex, oldFieldName) {
      let backwards = false;
      if (oldFieldName === "X") {
        if (oldRowIndex - newRowIndex < 0) {
          alert("nie mozna isc do tylu");
          backwards = true;
        }
      }
      if (oldFieldName === "Y") {
        if (oldRowIndex - newRowIndex > 0) {
          alert("nie mozna isc do tylu");
          backwards = true;
        }
      }
      return backwards;
    },
    checkForCapturingAPawn() {
      for (let row = 0; row < 7; row++) {
        for (let column = 0; column < 7; column++) {
          if (
            this.board[row][column].name !==
              this.board[row + 1][column + 1].name &&
            this.board[row + 1][column + 1].name !== "" &&
            this.board[row][column].name !== ""
          ) {
            console.log("musisz bic");
          }
        }
      }
    },
    movedOverEnemyPawn(
      newRowIndex,
      oldRowIndex,
      newColIndex,
      oldColIndex,
      oldFieldName,
      board
    ) {
      return (
        board[oldRowIndex + (newRowIndex - oldRowIndex) / 2][
          oldColIndex + (newColIndex - oldColIndex) / 2
        ].name !== oldFieldName &&
        board[oldRowIndex + (newRowIndex - oldRowIndex) / 2][
          oldColIndex + (newColIndex - oldColIndex) / 2
        ].name !== ""
      );
    },
    checkIfMovedOnDiferentColorOfField(newRowIndex, newColIndex) {
      return (newRowIndex + newColIndex) % 2 === 0;
    },
    checkIfMovedOnEnemyPawn(board, newRowIndex, newColIndex, oldFieldName) {
      return (
        board[newRowIndex][newColIndex].name !== oldFieldName &&
        board[newRowIndex][newColIndex].name !== ""
      );
    },
    checkIfMovedOnFriendlyPawn(board, newRowIndex, newColIndex, oldFieldName) {
      return board[newRowIndex][newColIndex].name === oldFieldName;
    },
    checkIfMovedFormoreThanOneField(
      newRowIndex,
      oldRowIndex,
      newColIndex,
      oldColIndex
    ) {
      return (
        Math.abs(newRowIndex - oldRowIndex) > 1 ||
        Math.abs(newColIndex - oldColIndex) > 1
      );
    },
  },
};
</script>

<template>
  <h1>Checkers</h1>
  <div class="statistics">
    <button class="button" @click="createBoard">Nakurwiaj wegoza</button>
    <span class="turn" v-if="isYTurn">Whites Turn</span>
    <span class="turn" v-else>Blacks Turn</span>
  </div>
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
            class="far fa-circle light"
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
.light {
  color: azure;
}
.statistics {
  display: flex;
  justify-content: center;
  justify-content: space-evenly;
  align-items: center;
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
.turn {
  font-size: 1.5em;
  color: white;
  font-weight: 600;
}
</style>
