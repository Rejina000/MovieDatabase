import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
})

// Request interceptor to automatically attach authorization headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export function getMovies() {
  return api.get('/movies')
}

export function getMovieById(movieId) {
  return api.get(`/movies/${movieId}`)
}

export function createMovie(movie) {
  return api.post('/movies', movie)
}

export function updateMovie(movieId, movie) {
  return api.put(`/movies/${movieId}`, movie)
}

export function login(credentials) {
  return api.post('/auth/login', credentials)
}

export function register(userData) {
  return api.post('/auth/register', userData)
}