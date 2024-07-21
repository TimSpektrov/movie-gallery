<template>
<!--  <BackButton />-->
  <div v-if="!item" class="not-movie">
    Такого фильма не существует
  </div>
  <div v-else class="movie">
    <div class="movie__container">
      <div class="movie__content">
        <h2 class="movie__title">{{ item.title }}</h2>
        <p class="movie__origin-title">{{ item.originalTitle }}</p>
        <h3 class="movie__section-title">О фильме</h3>
        <div class="movie__content-container">
          <div v-if="item.releaseYear" class="movie__container-left">Год производства</div>
          <div v-if="item.releaseYear" class="movie__container-right">{{ item.releaseYear }}</div>

          <div v-if="item.genres.length > 0" class="movie__container-left">Жанр</div>
          <div v-if="item.genres.length > 0" class="movie__container-right">{{ joinGenres(item.genres)}}</div>

          <div v-if="item.director" class="movie__container-left">Режиссер</div>
          <div v-if="item.director" class="movie__container-right">{{ item.director }}</div>

          <div v-if="item.budget" class="movie__container-left">Бюджет</div>
          <div v-if="item.budget" class="movie__container-right">{{ toMoney(item.budget) }}</div>

          <div v-if="item.runtime" class="movie__container-left">Время</div>
          <div v-if="item.runtime" class="movie__container-right">{{ setRuntime(item.runtime)}}</div>
        </div>
      </div>
      <img class="movie__img" :src="item.backdropUrl" alt="">
    </div>
    <div class="movie__plot" >{{ item.plot }}</div>
<!--    <div class="movie__trailer">-->
<!--      <button>Посмотреть трейлер</button>-->
<!--    </div>-->
  </div>



</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import {useMoviesStore} from "@/stores/getMoviesStore";
  import type {IMovie} from "@/helpers/types";
  import {joinGenres, setRuntime, toMoney} from "@/helpers/functions";

  const route = useRoute()
  const store = useMoviesStore()

  const item = store.movies.find((item: IMovie) => item.id === +route.params.id)
  console.log(item)
</script>

<style scoped lang="scss">
  .not-movie {
    min-height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 800px;
    padding: 20px;
    margin: 0 auto;
  }
  .movie {
    position: relative;
    background-color: #04081c;
    color: aliceblue;
    font-family: Arial, sans-serif;
    &__container {
      display: flex;
      align-items: stretch;
      justify-content: stretch;
    }
    &__content {
      position: relative;
      padding-left: 15px;
      flex-grow: 1;
      box-shadow: 0 0 50px 60px #04081c;
      z-index: 1;
    }
    &__plot {
      padding: 30px 15px;
      position: relative;
      z-index: 1;
      text-align: justify;
    }
    &__title {
      font-weight: 700;
      font-size: 38px;
      line-height: 1.1;
      margin-bottom: 0.5em;
      font-family: "Times New Roman", serif;
    }
    &__origin-title {
      opacity: .7;
      font-size: 18px;
      margin-bottom: 0.5em;
    }
    &__section-title {
      font-size: 26px;
      margin-bottom: 0.5em;
    }
    &__content-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    &__container-left,
    &__container-right {
      font-size: 14px;
      line-height: 1.5;
    }
    &__container-left {
      opacity: .8;
    }
    &__img {
      width: 60%;
      height: auto;
    }


  }
</style>