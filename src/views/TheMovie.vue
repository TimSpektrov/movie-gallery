<template>
<!--  <BackButton />-->
  <div v-if="!currentMovies" class="not-movie">
    Такого фильма не существует
  </div>
  <div v-else class="movie">
    <div class="movie__container">
      <div class="movie__content">
        <h2 v-if="!isEdit" class="movie__title">{{ currentMovies.title }}</h2>
        <input v-else class="movie__title movie__input" v-model="currentMovies.title" name="title">

        <p v-if="!isEdit" class="movie__origin-title">{{ currentMovies?.originalTitle }}</p>
        <input v-else class="movie__origin-title movie__input" v-model="currentMovies.originalTitle" name="originalTitle">
        <div
          v-if="!isEdit"
          class="movie__rate"
        >{{ roundRates(currentMovies?.tmdbRating) }}</div>
        <input v-else class="movie__rate movie__input" v-model="currentMovies.tmdbRating" name="tmdbRating" @input="maskInput($event, 'tmdbRating')" />

        <h3 class="movie__section-title">О фильме</h3>
        <div class="movie__content-container">
          <div v-if="currentMovies.releaseYear || isEdit" class="movie__container-left">Год производства</div>
          <div v-if="currentMovies.releaseYear && !isEdit" class="movie__container-right">{{ currentMovies?.releaseYear }}</div>
          <input v-if="isEdit" class="movie__origin-title movie__input" v-model="currentMovies.releaseYear" name="releaseYear" @input="maskInput($event, 'releaseYear')">

          <div v-if="currentMovies.genres.length > 0 || isEdit" class="movie__container-left">Жанр</div>
          <div v-if="currentMovies.genres.length > 0 && !isEdit" class="movie__container-right">{{ joinGenres(currentMovies.genres)}}</div>
          <div v-if="isEdit" class="movie__origin-title movie-genres">
            <div class="movie-genres__container">
              <span class="movie-genres__items-name">Убрать: </span>
              <button
                class="movie-genres__item"
                v-for="genre in newGenres.filter(el => el.isSelect)"
                :key="genre.value"
                @click="genre.isSelect = !genre.isSelect"
              >{{ genre.name }}</button>
            </div>
            <div class="movie-genres__container">
              <span class="movie-genres__items-name">Добавить: </span>
              <button
                class="movie-genres__item"
                v-for="genre in newGenres.filter(el => !el.isSelect)"
                :key="genre.value"
                @click="genre.isSelect = !genre.isSelect"
              >{{ genre.name }}</button>
            </div>
          </div>

          <div v-if="currentMovies.director || isEdit" class="movie__container-left">Режиссер</div>
          <div v-if="currentMovies.director && !isEdit" class="movie__container-right">{{ currentMovies.director }}</div>
          <input v-if="isEdit" class="movie__container-right movie__input" v-model="currentMovies.director" name="director">

          <div v-if="currentMovies.budget || isEdit" class="movie__container-left">Бюджет</div>
          <div v-if="currentMovies.budget && !isEdit" class="movie__container-right">{{ toMoney(currentMovies.budget) }}</div>
          <input v-if="isEdit" class="movie__container-right movie__input" v-model="currentMovies.budget" name="budget" @input="maskInput($event, 'budget')">

          <div v-if="currentMovies.runtime || isEdit" class="movie__container-left">Время</div>
          <div v-if="currentMovies.runtime && !isEdit" class="movie__container-right">{{ setRuntime(currentMovies.runtime)}}</div>
          <div v-if="isEdit" class="movie__runtime-container">
            <input class="movie__container-right movie__input" v-model="currentMovies.runtime" name="runtime" @input="maskInput($event, 'runtime')">
            <div class="movie__runtime-block">
              i
              <div class="movie__runtime-popup">
                Введите число в минутах
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="movie__img-container movie-img">
        <div class="movie-img__shadow"></div>
        <div class="movie-img__container">
          <div class="movie-img__shadow"></div>
          <img class="movie__img" :src="currentMovies.backdropUrl" alt="">
        </div>
        <div class="movie-img__shadow"></div>
        <input v-if="isEdit" class="movie__img-input movie__input" v-model="currentMovies.backdropUrl" name="director">
      </div>
    </div>
    <div v-if="!isEdit" class="movie__plot" >{{ currentMovies.plot }}</div>
    <textarea v-else class="movie__plot movie__input" v-model="currentMovies.plot" name="plot" />
  </div>
</template>

<script setup lang="ts">
import {onBeforeRouteUpdate, useRoute} from 'vue-router'
  import {useMoviesStore} from "@/stores/getMoviesStore";
import type {ICreateGenres, IMovie} from "@/helpers/types";
  import {joinGenres, roundRates, setRuntime, toMoney} from "@/helpers/functions";
import {computed, onBeforeMount, ref, watch} from "vue";
  import {editBudget, editNumber, editYears} from "@/helpers/inputsFormater";
  import {genres} from "@/helpers/types";
import {storeToRefs} from "pinia";

  const route = useRoute()
  const store = useMoviesStore()

  const {currentMovies, movies} = storeToRefs(store)
  const newItem: IMovie = {
    id: Date.now(),
    title: '',
    originalTitle: '',
    releaseYear: (new Date()).getFullYear(),
    genres: [],
    director:	'',
    budget:	'',
    runtime: 0,
    tmdbRating:	5,
    plot:	'',
    backdropUrl:	'',
    posterUrl: '',
  }
onBeforeMount(() => {
  switch (route.name) {
    case 'add':
      currentMovies.value = {...newItem}
      break;
    default:
      currentMovies.value = {...movies.value.find((movie: IMovie) => movie.id === +route.params.id)}
  }
})

  const isEdit = computed(() => {
    return route.name === 'edit'
  })

  const newGenres = ref(Object.keys(genres).map((key: string) => ({
      value: key,
      name: genres[key],
      isSelect: currentMovies.value?.genres.includes(key)
    })))



onBeforeRouteUpdate((to, from) => {
  console.log(to)
})

  watch(newGenres.value, (newValue: ICreateGenres[]) => {
    currentMovies.value.genres = newValue.filter(el => el.isSelect).map(el => el.value)
  }, {deep: true, immediate: true})

  const maskInput = (event: Event, inputName: string) => {
    const inputElement = event.target as HTMLInputElement;
    let updateValue = inputElement.value;

    switch (inputName) {
      case 'releaseYear':
        updateValue = editYears(updateValue);
        break;
      case 'tmdbRating':
        updateValue = editNumber(updateValue)
        break;
      case 'budget':
      case 'runtime':
        updateValue = editBudget(updateValue);
        break;
    }
    newItem.value[inputName] = updateValue;
  }
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
      padding-left: 15px;
      flex-grow: 1;
      z-index: 1;
      width: 40%;
    }
    &__plot {
      padding: 30px 15px;
      position: relative;
      z-index: 1;
      text-align: justify;
      &.movie__input {
        padding: 15px;
        width: 100%;
        height: calc(10em + 30px);
      }
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
    &__rate {
      position: absolute;
      top: 10px;
      right: 20px;
      height: 2em;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      font-family: Arial, sans-serif;
      font-size: 14px;
      &.movie__input {
        background-color: lightgreen;
        color: #04081c;
        width: 5em;
        text-align: center;
      }
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
    &__img-container {
      width: 60%;
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
    &__img {
      height: auto;
      width: 100%;
      object-fit: cover;
      object-position: center;
      &-input {
        position: relative;
        z-index: 1;
      }
    }
    &-img {
      &__shadow {
        box-shadow: 0 0 20px 30px #04081c;
        position: relative;
      }
      &__container {
        display: flex;
      }
    }
    &__input {
      outline: none;
      border: none;
      width: auto;
      max-width: 100%;
      background: rgba(255,255,255,.1);
      color: inherit;
      font-family: inherit;
    }
    &-genres {
      &__items-name {
        font-weight: 300;
        font-size: 14px;
      }
      &__item {
        color: #fff;
        background-color: rgba(255,255,255,0);
        border: 1px solid currentColor;
        border-radius: 5px;
        padding: 0 5px;
        cursor: pointer;
        transition: background-color .2s;
        &:not(:last-child) {
          margin-right: 4px;
        }
        &:hover {
          background-color: rgba(255,255,255,.2);
        }
      }
      &__container {
        &:first-child {
          margin-bottom: .5em;
        }
      }
    }
    &__runtime-container {
      display: flex;
      align-items: center;
      gap: 5px;
      .movie__input {
        flex-grow: 1;
      }
    }
    &__runtime-block {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.2em;
      height: 1.2em;
      border-radius: 50%;
      border: 1px solid currentColor;
      opacity: 0.8;
      font-size: 14px;
      color: #FFFFFF;
      cursor: pointer;
      transition: opacity .3s;
      &:hover {
        opacity: 1;
        .movie__runtime-popup {
          opacity: 1;
        }
      }
    }
    &__runtime-popup {
      position: absolute;
      bottom: 150%;
      right: 0;
      background-color: #04081c;
      padding: 5px;
      border-radius: 5px;
      border: 1px solid currentColor;
      opacity: 0;
      transition: opacity .3s;
    }
  }
</style>