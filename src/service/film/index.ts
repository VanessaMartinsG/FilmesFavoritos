import api from '../api'

export const movieService = {
    async getMovieList() {
        try {
            const response = await api.get('/genre/movie/list')
            return response
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async discoverMovie() {
        try {
            const response = await api.get('/discover/movie')
            return response
        } catch (error) {
            return Promise.reject(error)
        }
    }
}


