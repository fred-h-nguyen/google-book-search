import axios from 'axios'

export default {
    getBooks: (query) => {
        return axios.get('api/google', { params: { q: "title:" + query } });
    },
    getSavedBooks: () => {
        return axios.get('/api/books');
    },
    deleteBook: (id) => {
        return axios.delete(`/api/books/${id}`)
    },
    saveBook: (bookData) => {
        return axios.post('/api/books', bookData);
    }
};