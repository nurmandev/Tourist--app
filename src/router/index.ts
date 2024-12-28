
import Bookings from "@/views/bookings.vue";
import Checkout from "@/views/checkout.vue";
import Discover from "@/views/Discover.vue";
import ExploreAround from "@/views/explore-around.vue";
import ExploreLisbon from "@/views/explore-lisbon.vue";
import Home from "@/views/Home.vue";
import MbwayTimer from "@/views/mbway-timer.vue";
import Success from "@/views/success.vue";
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
  {
    path: "/bookings",
    name: "Bookings",
    component: Bookings,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/mbway-timer",
    name: "MbwayTimer",
    component: MbwayTimer,
  },
  {
    path: "/success",
    name: "Success",
    component: Success,
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
