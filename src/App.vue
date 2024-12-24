
<template>
  <div 
   class="overflow-hidden max-w-sm mx-auto w-full pb-24 pt-5 px-3">
    <router-view /> 
  </div>
<Footer />
</template>

<script lang='ts'>
import Footer from './components/layout/footer.vue';
export default {
  name: 'App',
  components:{Footer} 
}
</script>
