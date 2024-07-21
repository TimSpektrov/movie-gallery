<template>
  <div v-if="store.openModalAuth"  class="auth-popup" @click.stop="handleBg">
    <div class="auth-popup__container">
      <button @click="handleClose" class="auth-popup__close">
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px">
          <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/>
        </svg>
      </button>

      <form v-if="!store.isAuth" @submit.prevent="handleLogin">
        <input v-model="name" type="text" name="name" placeholder="Имя" />
        <button :disabled="name.length < 2" type="submit" >Войти</button>
      </form>
      <div v-else class="auth-popup__logout" >
        <p class="auth-popup__description">Вы уверены?</p>
        <button @click="handleLogout">Да, я хочу выйти</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useMoviesStore} from "@/stores/getMoviesStore";

const store = useMoviesStore()
const name = ref('')

const handleClose = () => {
  store.openModalAuth = false
}
const handleBg = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    store.openModalAuth = false
  }
}

const handleLogin = () => {
  store.isAuth = true;
  name.value = '';
  store.openModalAuth = false;
}

const handleLogout = () => {
  store.isAuth = false;
  store.openModalAuth = false;
}
</script>

<style scoped lang="scss">
  .auth-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(2px);
    background-color: rgba(255,255,255, .3);
    &__container {
      position: relative;
      padding: 30px 15px;
      width: 500px;
      max-width: calc(100% - 20px);
      max-height: calc(100% - 20px);
      border-radius: 15px;
      color: #04081c;
      background-color: #FFFFFF;
      border: 1px solid currentColor;
      font-family: Arial, sans-serif;
      button {
        font-family: inherit;
      }
    }
    &__close {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      svg{
        width: 30px;
        height: 30px;
      }
    }
    &__logout {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      gap: 30px;

    }
  }
</style>