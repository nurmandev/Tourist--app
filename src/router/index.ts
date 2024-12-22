import Discover from "@/views/discover.vue";
import GetToKnowLisbon from "@/views/Get-to-know-Lisbon.vue";
import Home from "@/views/Home.vue";
import { createWebHistory, createRouter } from "vue-router";



const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Get-to-know-Lisbone",
    name: "GetToKnowLisbon",
    component: GetToKnowLisbon,
  },
  {
    path: "/Discover",
    name: "Discover",
    component: Discover,
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;