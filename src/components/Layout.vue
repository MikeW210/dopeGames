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
  margin: 1em;
  border: 0.16em solid rgba(255, 255, 255, 0);
  border-radius: 2em;
  background: rgb(23, 3, 97);
  height: 2em;
  width: 4em;
  color: white;
  box-shadow: 1px 1px 1px rgb(0, 0, 0);
}
</style>
