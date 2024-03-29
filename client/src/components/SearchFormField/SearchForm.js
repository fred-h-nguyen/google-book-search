import React from 'react'
import { Segment, Form, Header, Button, Grid } from 'semantic-ui-react'
import Results from '../ResultsField/Results'
import API from '../../utils/API'
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');

class SearchForm extends React.Component {

    state = {
        query: '',
        books: [],
        message: ''
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

    sendSocketIO = (data) => {
        socket.emit('book_added', data);
    };

    // socketListener() {
    //     socket.on('book_added', function (data) {
    //         // this.setState({message:data})
    //         alert(data)
    //     })
    // }

    componentDidMount() {
        // const socket = openSocket('http://localhost:8000');
        socket.on('book_added', (data) => {
            this.setState({ message: data })
        })
    }

    componentDidUpdate(prevProps,prevState){
        if (this.state.message !== prevState.message){
            alert(this.state.message);
        }
    }

    render() {
        // this.sendSocketIO = this.sendSocketIO.bind(this);
        // this.socketListener();
        console.log(this.state.message)
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
                            <Button type='submit' size='mini' color="green">Search</Button>
                        </div>
                    </Form>
                </Segment>
                <Segment>
                    {this.state.books.map(book => (
                        <Results
                            key={book.id}
                            title={book.volumeInfo.title}
                            authors={book.volumeInfo.authors.join(', ')}
                            link={book.volumeInfo.infoLink}
                            description={book.volumeInfo.description}
                            image={book.volumeInfo.imageLinks.thumbnail}
                        >
                            <Grid.Column width='1'>
                                <Button size='mini' color='blue'
                                    onClick={() => {
                                        this.handleBookSave(book.id)
                                        this.sendSocketIO(book.volumeInfo.title)
                                    }}>Save</Button>
                            </Grid.Column>
                        </Results>))}
                </Segment>
            </>
        )
    }
}

export default SearchForm