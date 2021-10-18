<template>
  <div class="container">
    <div class="select-game">
      <router-link :to="{ name: 'TicTacToe' }">
        <button class="pick-a-game">Play TicTacToe</button>
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
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
}
.pick-a-game {
  width: 8em;
  height: 8em;
  border-radius: 15px;
  border: solid 1px;
  font-size: 1rem;
  letter-spacing: 0.08rem;
  position: relative;
  cursor: pointer;
}
</style>
