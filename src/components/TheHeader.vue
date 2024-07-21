<template>
  <header class="header">
    <RouterLink class="logo-link" to="/"><img alt="logo" class="logo" src="@/assets/img/svg/logo.svg" /></RouterLink>
    <button
      class="header__button"
      @click="handleClickAuth"
      :class="{'header__button-auth': store.isAuth}"
    >{{ store.isAuth ? 'Выйти' : 'Войти' }}</button>
  </header>
</template>

<script setup lang="ts">
import {RouterLink} from "vue-router";
import {useMoviesStore} from "@/stores/getMoviesStore";

const store = useMoviesStore()

const handleClickAuth = () => {
  store.openModalAuth = true
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
      &:hover {
        background-color: rgba(255,255,255,0.2);
      }
      &-auth {
        color: #33d;
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