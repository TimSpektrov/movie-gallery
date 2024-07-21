<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from "@/components/TheHeader.vue";
import AuthPopup from "@/components/AuthPopup.vue";


</script>

<template>
  <TheHeader />
  <main>
    <RouterView />
  </main>

<auth-popup />
</template>

<style lang="scss">
 * {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
 }
 body {
   background-color: #04081c;
   min-height: 100vh;
 }
</style>
