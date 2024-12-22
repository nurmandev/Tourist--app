
<template>
  <router-view /> 
<Footer />
</template>

<script lang='ts'>
import Footer from './components/layout/footer.vue';
export default {
  name: 'App',
  components:{Footer} 
}
</script>
