import React from 'react'
import { Segment, Form, Header, Button, Grid} from 'semantic-ui-react'
import Results from '../ResultsField/Results'
import API from '../../utils/API'

class SearchForm extends React.Component {

    state = {
        query: '',
        googleBooks: []
    }

    handleInput = (event) => {
        this.setState({ query: event.target.value })
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.getBooks();
    }

    getBooks = () => {
        API.getBooks(this.state.query)
            .then(res => {
                this.setState({
                    books: res.data
                })
            })
            .catch(() => {
                this.setState({
                    books: []
                })
                alert('No New Books Found, Try a Different Query')
            });
    };

    handleBookSave = id => {
        const book = this.state.books.find(book => book.id === id);

        API.saveBook({
            googleId: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks.thumbnail,
            link: book.volumeInfo.infoLink,
        })
            .then(() => { this.getBooks() });
    };

    render() {
        return (
            <>
                <Segment style={{ padding: '5px' }}>
                    <Header as='h3'>Book Search</Header>
                    <Form size='mini' style={{ marginRight: '5px' }}
                        onSubmit={this.handleFormSubmit}>
                        <Form.Input
                            fluid
                            label='Book'
                            placeholder="Harry Potter and the Sorcerer's Stone"
                            value={this.state.query}
                            onChange={this.handleInput}
                        />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            <Button type='submit' size='mini'>Search</Button>
                        </div>
                    </Form>
                </Segment>
                <Segment>
                    {this.state.googleBooks.map(book => (
                        <Results
                            key={googleBooks.id}
                            title={book.volumeInfo.title}
                            authors={book.volumeInfo.authors.join(', ')}
                            link={book.volumeInfo.infoLink}
                            description={book.volumeInfo.description}
                            image={book.volumeInfo.imageLinks.thumbnail}
                        >
                            <Grid.Column width='1'>
                                <Button size='mini'
                                    onClick={this.handleBookSave(book.id)}>Save</Button>
                            </Grid.Column>
                        </Results>))}
                </Segment>
            </>
        )
    }
}

export default SearchForm