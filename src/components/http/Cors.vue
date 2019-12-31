<template>
    <div>
      Cors
    </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

export default {
  name: 'Cors',
  mounted() {
    const url = 'https://www.easy-mock.com/project/5e0aead627b4df12606892ec';
    axios.get(url).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style scoped>

</style>
