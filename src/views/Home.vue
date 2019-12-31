<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <jsonp></jsonp>
  </div>
</template>

<script>
// @ is an alias to /src
import Jsonp from '@/components/Jsonp.vue';

export default {
  name: 'home',
  components: {
    Jsonp,
  },
};
</script>
