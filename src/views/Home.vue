<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <cors></cors>
  </div>
</template>

<script>
// @ is an alias to /src
import Cors from '@/components/http/Cors.vue';

export default {
  name: 'home',
  components: {
    Cors,
  },
};
</script>
