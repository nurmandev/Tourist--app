
import Discover from "@/views/Discover.vue";
import ExploreAround from "@/views/explore-around.vue";
import ExploreLisbon from "@/views/explore-lisbon.vue";
import Home from "@/views/Home.vue";
// @ts-ignore
import TourDetails from "@/views/tour-details.vue";
import { createWebHistory, createRouter } from "vue-router";



const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: '/tour/:id',
    name: 'TourDetails',
    component: TourDetails,
    props: true,
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
