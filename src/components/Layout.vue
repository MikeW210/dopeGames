<template>
  <div class="header">
    <router-link to="Home">
      <button class="home-button">
        Home
      </button>
    </router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "Layout",
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background: #00cad0;
}
.home-button {
  background: #00989b;
  height: 2em;
  width: 4em;
  border-radius: 5px;
  box-shadow: 1px 1px 1px rgb(0, 0, 0);
}
</style>
