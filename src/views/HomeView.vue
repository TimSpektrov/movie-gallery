<template>
<section class="movies">
  <div class="movies__container">
    <movie-card v-for="movie in store.movies" :key="movie.id" :item="movie" />
  </div>
</section>
</template>

<script setup lang="ts">

import {useMoviesStore} from "@/stores/getMoviesStore";
import MovieCard from "@/components/MovieCard.vue";

const store = useMoviesStore()

store.fetchMoviesData()
</script>

<style scoped lang="scss">
  .movies__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: 300px;
    gap: 20px;
    background-color: #04081c;
  }
</style>
