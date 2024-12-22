

import Discover from "@/views/discover.vue";
import ExploreAround from "@/views/explore-around.vue";
import ExploreLisbon from "@/views/explore-lisbon.vue";
import Home from "@/views/home.vue";
import { createWebHistory, createRouter } from "vue-router";



const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/explore-lisbon",
    name: "ExploreLisbon",
    component: ExploreLisbon,
  },
  {
    path: "/discover",
    name: "Discover",
    component: Discover,
  },
  {
    path: "/explore-around",
    name: "ExploreAround",
    component: ExploreAround,
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;