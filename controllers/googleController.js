const axios = require('axios');
const db = require('../models')

module.exports = {
    findAll: function (req, res) {
        const { query: params } = req

        axios.get('https://www.googleapis.com/books/v1/volumes', { params })
            .then(results => {
                const apiBooks = results.data.items.filter(result =>
                    result.volumeInfo.title &&
                    result.volumeInfo.authors &&
                    result.volumeInfo.description &&
                    result.volumeInfo.imageLinks &&
                    result.volumeInfo.imageLinks.thumbnail &&
                    result.volumeInfo.infoLink
                )
                return apiBooks
            })
            .then(apiBooks => {
                const books = db.Book.find()
                    .then(dbBooks =>
                        apiBooks.filter(apiBook =>
                            dbBooks.every(dbBook => dbBook.googleId.toString() !== apiBook.id)
                        )
                    )
                return books;
            })
            .then(books => {
                res.json(books)
            })
            .catch(err => { res.status(422).json(err) })
    }
}