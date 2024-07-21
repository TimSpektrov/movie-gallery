import {defineStore} from "pinia";
import {computed, ref} from "vue"
import axios from "axios";

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref(localStorage.getItem('movies') ? JSON.parse(localStorage.movies) : [])
  // const genres = ref(localStorage.getItem('genres') ? JSON.parse(localStorage.genres) : [])
  const currentMovies = ref(null)
  const isLoadingMovies = ref(false)
  const isLoadingGenres = ref(false)
  const isAuth = ref(false)

  const isLoading = computed(() => isLoadingGenres.value || isLoadingMovies.value)
  const fetchMoviesData = async () => {
    if (!movies.value || movies.value.length < 1) {
      isLoadingMovies.value = true
      try {
        axios
          .get('https://cinemaguide.skillbox.cc/movie')
          .then((response) => {
            console.log(response.data)
            localStorage.setItem('movies', JSON.stringify(response.data))
            movies.value = response.data
          })
      } catch (err) {
        console.log('Ошибка загрузки данных', err)
      } finally {
        isLoadingMovies.value = false
      }
    }
  }
  // const fetchGenresData = async () => {
  //   if (!genres.value || genres.value.length < 1) {
  //     isLoadingGenres.value = true
  //     try {
  //       axios
  //         .get('https://cinemaguide.skillbox.cc/movie/genres')
  //         .then((response) => {
  //           console.log(response.data)
  //           localStorage.setItem('genres', JSON.stringify(response.data))
  //           genres.value = response.data
  //         })
  //     } catch (err) {
  //       console.log('Ошибка загрузки данных', err)
  //     } finally {
  //       isLoadingGenres.value = false
  //     }
  //   }
  // }

  return {movies, fetchMoviesData, isLoading, currentMovies, isAuth}
})