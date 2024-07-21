<template>
  <header class="header">
    <RouterLink class="logo-link" to="/"><img alt="logo" class="logo" src="@/assets/img/svg/logo.svg" /></RouterLink>
    <button  @click="handleClickAuth">{{ isAuth ? 'Выйти' : 'Войти' }}</button>
    <button @click="handleClickTheme">{{ isLightTheme ? 'Выйти' : 'Войти' }}</button>
  </header>
</template>

<script setup lang="ts">
import {RouterLink} from "vue-router";
import {ref} from "vue";
let isAuth = ref(false)
let isLightTheme = ref(false)

const handleClickAuth = () => {
  isAuth.value = !isAuth.value
}
const handleClickTheme = () => {
  isLightTheme.value = !isLightTheme.value
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
  }
  .logo-link {
    margin-right: auto;
  }
  .logo {
    max-height: 50px;
    width: auto;
  }


</style>