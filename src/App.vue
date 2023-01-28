<template>
  <div id="app">
    <div class="background">
      <ProductDisplay />
    </div>
  </div>
</template>

<script>
import ProductDisplay from './components/ProductDisplay.vue';

export default {
  name: 'App',
  components: {
    ProductDisplay,
  },
};
</script>
