<template>
  <div class="container">
    <div class="select-game">
      <router-link :to="{ name: 'TicTacToe' }">
        <button class="pick-a-game">Play TicTacToe</button>
      </router-link>
      <router-link :to="{ name: 'AdvancedTicTacToe' }">
        <button class="pick-a-game">Play Advanced and Pro TicTacToe</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
<style scoped>
.container {
  display: flex;
}

.select-game {
  display: flex;
  width: 100%;
  height: 200px;
  justify-content: flex-start;
  align-items: center;
}
.pick-a-game {
  width: 8em;
  height: 8em;
  border-radius: 50%;
  background: rgb(93, 11, 170);
  box-shadow: 1px 1px 1px rgb(65, 58, 58);
  font-size: 1rem;
  letter-spacing: 0.08rem;
  position: relative;
  margin: 1em;
  cursor: pointer;
}
</style>
