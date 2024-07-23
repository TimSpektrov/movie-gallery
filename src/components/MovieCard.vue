<template>
  <div class="movie-card" @click="handleClick">
    <img class="movie-card__bg" :src="props.item.posterUrl" :alt="props.item.title">
    <div
      class="movie-card__rate"
      :class="{'movie-card__rate_gold': props.item.tmdbRating > 8, 'movie-card__rate_silver': props.item.tmdbRating > 7}"
    >{{ roundRates(props.item.tmdbRating) }}</div>
    <h3 class="movie-card__title">{{ props.item.title }} <span class="movie-card__years">({{ props.item.releaseYear }})</span></h3>
  </div>
</template>

<script setup lang="ts">
import type { IMovie } from "@/helpers/types";
import { roundRates } from "@/helpers/functions";
import { useRouter } from "vue-router";

const props = defineProps<{
  item: IMovie
}>()

const router = useRouter()

const handleClick = () => {
  console.log(props.item.id)
  router.push({name: 'movie', params: {id: props.item.id}})
}
</script>

<style scoped lang="scss">
  .movie-card {
    position: relative;
    cursor: pointer;
    transition: scale .4s;
    background-color: rgba(255,255,255,.03);
    &:hover {
      scale: 1.03;
    }
    &__bg {
      width: 100%;
      height: calc(100% - 106px);

      object-fit: cover;
      object-position: center;
    }
    &__rate {
      position: absolute;
      top: 10px;
      left: 10px;
      height: 2em;
      width: 4em;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      font-family: Arial, sans-serif;
      font-size: 14px;
      background-color: lightgreen;
      &_silver {
        background-color: silver;
      }
      &_gold {
        background-color: gold;
      }
    }
    &__title {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: calc(4em + 34px);
      margin: 0;
      padding: 10px;
      font-size: 18px;
      text-align: center;
      color: yellow;
      overflow: hidden;
      z-index: 1;
    }
  }
</style>