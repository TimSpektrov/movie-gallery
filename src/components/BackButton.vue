<template>
  <button class="back-button" @click="handleBack">
    <img class="back-button__img" src="/src/assets/img/back-button.png" alt="back button"/>
  </button>
</template>

<script setup lang="ts">

import { useRouter } from "vue-router";

const router = useRouter()
const handleBack = () => {
  router.back()
}
</script>

<style lang="scss">
  .back-button {
    cursor: pointer;
    background: none;
    border: none;
    position: fixed;
    top: 80px;
    &__img {
      width: 50px;

    }
  }
</style>