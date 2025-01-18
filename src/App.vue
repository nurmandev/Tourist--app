
<template>
  <div 
   class="overflow-hidden max-w-sm mx-auto w-full pb-24 pt-5 px-3">
    <router-view /> 
  </div>
<Footer />
</template>

<script lang='ts'>
import Footer from './components/shared/footer.vue';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

// Scroll to top on component mount
onMounted(() => {
  window.scrollTo(0, 0);
});

// Scroll to top on route change
watch(route, () => {
  window.scrollTo(0, 0);
});

export default {
  name: 'App',
  components:{Footer} 
}
</script>
