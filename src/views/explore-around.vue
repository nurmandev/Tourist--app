<template>
    <div
    v-motion
    :initial="{
      opacity: 0,
      y: 100,
    }"
    :enter="{
      opacity: 1,
      y: 0,
      transition: {
        delay: 100,
        duration: 800,
      },
    }"
     class="py-4 " v-if="data">
        <a href="/explore-lisbon" class="flex cursor-pointer justify-center w-[50px] bg-white p-2 rounded-lg ">
        <ArrowLeft />
      </a>
      <h1 class="text-2xl font-medium my-4">How to move around {{ data.name }}</h1>
      <div v-for="mode in data.transportModes" :key="mode.title" class="mb-6">
        <h2 class="text-lg font-semibold">{{ mode.title }}</h2>
        <img
          :src="mode.image"
          :alt="mode.title"
          class="w-full h-48 object-cover rounded-t-lg mt-2 "
        />
        <div class="bg-white px-3 pt-4 pb-6 rounded-b-lg">

       
        <!-- If description is an array, render multiple paragraphs -->
    <template v-if="Array.isArray(mode.description)">
      <p class="mt-3 bg-white" v-for="(desc, index) in mode.description" :key="index">
        {{ desc }}
      </p>
    </template>
    <template v-else>
      <p>{{ mode.description }}</p>
    </template>
    <p v-if="mode?.train" class="flex bg-white items-center gap-x-2 mt-4 text-sm">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 1.5H5.5C4.83719 1.50075 4.20174 1.76439 3.73307 2.23307C3.26439 2.70174 3.00075 3.33719 3 4V10C3.00186 10.5374 3.17718 11.0598 3.49989 11.4896C3.82259 11.9193 4.27543 12.2334 4.791 12.385L3.88465 14.5H4.97255L5.8297 12.5H10.1703L11.0274 14.5H12.1153L11.209 12.385C11.7246 12.2334 12.1774 11.9193 12.5001 11.4896C12.8228 11.0598 12.9981 10.5374 13 10V4C12.9992 3.33719 12.7356 2.70174 12.2669 2.23307C11.7983 1.76439 11.1628 1.50075 10.5 1.5ZM5.5 2.5H10.5C10.8092 2.50093 11.1105 2.59756 11.3626 2.77661C11.6147 2.95566 11.8051 3.20836 11.9079 3.5H4.09215C4.19486 3.20836 4.38532 2.95566 4.6374 2.77661C4.88948 2.59756 5.1908 2.50093 5.5 2.5ZM12 9.5H10.5V10.5H11.9079C11.8051 10.7916 11.6147 11.0443 11.3626 11.2234C11.1105 11.4024 10.8092 11.4991 10.5 11.5H5.5C5.1908 11.4991 4.88948 11.4024 4.6374 11.2234C4.38532 11.0443 4.19486 10.7916 4.09215 10.5H5.5V9.5H4V8.5H12V9.5ZM12 7.5H4V4.5H12V7.5Z" fill="#00001E"/>
</svg>
       {{ mode?.train }}</p>
    <p v-if="mode?.time" class="flex bg-white items-center gap-x-2 mt-4 text-sm"><AlarmClock :size="19" /> {{ mode?.time }}</p>
   
</div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { AlarmClock, ArrowLeft } from 'lucide-vue-next';
import { ref, onMounted, watch } from 'vue'
  import { useRoute } from 'vue-router'
  
  interface TransportMode {
    title: string;
    image: string;
    description:  string | string[];
    time?:string | null;
    train?:string | null;
  }
  
  interface LocationData {
    [key: string]: {
      name: string;
      transportModes: TransportMode[];
    };
  }
  
  const locationData: LocationData = {
    lisbon: {
      name: "Lisbon",
      transportModes: [
        {
          title: "On foot",
          image: "/images/lisbon1.png",
          description: "This is the best way to travel within downtown. You can walk to most downtown attractions, but make sure your shoes are comfortable and your legs are not tired (we have a lot of sloping streets, sorry!)",
        },
        {
          title: "Metro",
          image: "/images/lisbon2.png",
          time:"06:30 to 01:00",
          train:"4 color-coded lines, 55 stations",
          description: [
          "This is the easiest way to move around, although it doesn’t get you much outside Lisbon (Sintra for example).",
          "If you are planning on using metro a lot, buy the ‘Lisboa Viva’ card and take advantage on cheaper trips."
      ],
        },
        {
          title: "Bus & Trans",
          image: "/images/lisbon3.png",
          time:"06:30 to 00:00",
          description: [
        "Bus can literally take you anywhere in this town! But unfortunately they can get crowded.",
        "When it comes to trams, the 28E is the most historical one, getting you through Mouraria, Alfama and Graça. Honestly, any old tram is a must for an amazing experience."
      ],
        },
        {
          title: "Trains",
          image: "/images/lisbon4.png",
          description: "Trains are quicker and can take you outside Lisbon. You can also get to Belém or Cascais really quick.",
        },
      ],
    },
    sintra: {
      name: "Sintra",
      transportModes: [
        {
          title: "Bus",
          image: "/images/lisbon3.png",
          description: "Buses in Sintra take you to all the tourist attractions.",
        },
        {
          title: "Taxi",
          image: "/images/lisbon4.png",
          description: "Taxis are convenient for small groups and can take you to offbeat locations.",
        },
      ],
    },
    belem: {
      name: "Belem",
      transportModes: [
        {
          title: "Trams",
          image: "/images/home5.png",
          description: "The 15E tram is a popular way to travel to Belem. Enjoy a scenic ride through Lisbon.",
        },
        {
          title: "Biking",
          image: "/images/home6.png",
          description: "Explore Belem by bike for an eco-friendly and fun experience.",
        },
      ],
    },
  };
  
  const route = useRoute()
  const data = ref<{ name: string; transportModes: TransportMode[] } | null>(null)
  
  const updateData = () => {
    const location = (route.query.location as string | undefined)?.toLowerCase()
    data.value = location ? locationData[location] || null : null
  }
  
  onMounted(updateData)
  
  watch(() => route.query.location, updateData)
  </script>