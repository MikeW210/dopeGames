import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import TicTacToe from "../views/tic-tac-toe/TicTacToe.vue";
import AdvancedTicTacToe from "../views/advanced-tic-tac-toe/AdvancedTicTacToe.vue";
import Checkers from "../views/checkers/Checkers.vue";
const routes = [
  {
    path: "/",
    redirect: { name: "Home" },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/tic-tac-toe",
    name: "TicTacToe",
    component: TicTacToe,
  },
  {
    path: "/advanced-tic-tac-toe",
    name: "AdvancedTicTacToe",
    component: AdvancedTicTacToe,
  },
  {
    path: "/checkers",
    name: "Checkers",
    component: Checkers,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
