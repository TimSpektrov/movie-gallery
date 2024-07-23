<template>
  <header class="header">
    <RouterLink class="logo-link" to="/">
      <img alt="logo" class="logo" src="@/assets/img/svg/logo.svg" />
    </RouterLink>

    <RouterLink v-show="createButton" class="header__button" to="/add-new">
      Добавить новый
    </RouterLink>

    <RouterLink v-show="removeButton" class="header__button" :to="`/edit-movie/${route.params.id}`">
      Редактировать
    </RouterLink>

    <button
      v-show="editButton"
      @click="cancelMovie"
      class="header__button"
    >Отменить</button>
    <button
      v-show="editButton"
      @click="saveMovie"
      class="header__button"
    >Сохранить</button>
    <button
      v-show="removeButton"
      @click="removeMovie"
      class="header__button header__button_delete"
    >Удалить</button>

    <button
      class="header__button"
      @click="handleClickAuth"
      :class="{'header__button-auth': store.isAuth}"
    >{{ store.isAuth ? 'Выйти' : 'Войти' }}</button>

  </header>
</template>

<script setup lang="ts">
import {RouterLink, useRoute, useRouter} from "vue-router";
import {useMoviesStore} from "@/stores/getMoviesStore";
import { computed } from "vue";
import type {IMovie} from "@/helpers/types";

const store = useMoviesStore()
const route = useRoute()
const router = useRouter()
console.log(route.name)
const createButton = computed(() => {
  return route.name === 'home' && store.isAuth
})

const removeButton = computed(() => {
  return route.name === 'movie' && store.isAuth
})

const editButton = computed(() => {
  return route.name === 'edit' && store.isAuth
})
const handleClickAuth = () => {
  store.openModalAuth = true
}

const saveMovie = () => {
  const index = store.movies.findIndex((item: IMovie) => item.id === +route.params.id)
  if (index !==  -1) {
    store.movies[index] = {...store.currentMovies}
    store.currentMovies = null
    router.push(`/movie/${route.params.id}`)
  } else {
    console.error('ошибка сохранения фильма')
  }
}

const cancelMovie = () => {
  const index = store.movies.findIndex((item: IMovie) => item.id === +route.params.id)
  if (index !==  -1) {
    console.log(index)
    console.log(store.movies[index])
    store.currentMovies = {...store.movies[index]}
    // store.currentMovies = null
    // router.push(`/movie/${route.params.id}`)
  } else {
    console.error('ошибка отмены сохранения фильма')
  }
}

const removeMovie = () => {
  const index = store.movies.findIndex((item: IMovie) => item.id === +route.params.id)
  if ( index !== -1)  {
    store.movies = store.movies.filter((movie: IMovie) => movie.id !== +route.params.id);
    store.currentMovies = null;
    router.push('/');
  }
  console.log(index)
}

</script>

<style scoped lang="scss">
  .header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    max-width: 1200px;
    margin-inline: auto;
    padding: 10px;
    gap: 20px;
    background-color: #04081c;
    position: relative;
    z-index: 2;

    &__button {
      padding: 15px;
      color: #FFF;
      border:1px solid currentColor;
      border-radius: 10px;
      background-color: rgba(255,255,255,0);
      cursor: pointer;
      transition: background-color .3s;
      text-decoration: none;
      font-family: Arial, sans-serif;
      font-size: 14px;
      &:hover {
        background-color: rgba(255,255,255,0.2);
      }
      &-auth {
        color: #33d;
      }
      &_delete {
        color: #480d0d;
      }
    }
  }
  .logo-link {
    margin-right: auto;
  }
  .logo {
    max-height: 50px;
    width: auto;
  }


</style>