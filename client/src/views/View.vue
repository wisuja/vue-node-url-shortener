<template>
  <div class="d-flex justify-content-center align-items-center">
    <p class="mb-0" v-if="isLoading">Loading...</p>
    <p class="mb-0" v-else>Not Found.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['slug'],
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    axios
      .get(this.server_url + this.slug)
      .then(({ data: { url } }) => (window.location.href = url))
      .catch((error) => (this.isLoading = false));
  },
};
</script>

<style scoped>
div {
  width: 100vw;
  height: 100vh;
}
</style>
