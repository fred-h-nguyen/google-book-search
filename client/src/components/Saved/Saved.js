import React from 'react';
import Results from '../ResultsField/Results';
import API from '../../utils/API';
import { Segment, Grid, Button} from 'semantic-ui-react';


class Saved extends React.Component {
    state = {
        books: []
    }

    componentDidMount() {
        this.getSavedBooks();
    };

    getSavedBooks = () => {
        API.getSavedBooks()
            .then(res => {
                this.setState({ books: res.data })
            })
            .catch(err => console.log(err))
    };

    handleBookDelete = id => {
        API.deleteBook(id).then(res => this.getSavedBooks());
    };

    render() {
        return (
                <Segment>
                    {this.state.books.map(book => <Results
                        key={book._id}
                        title={book.title}
                        authors={book.authors.join(', ')}
                        link={book.link}
                        image={book.image}
                        handleBookDelete={this.handleBookDelete}
                    >
                        <Grid.Column width='1'>
                            <Button size='mini' color="red"
                                onClick={()=>this.handleBookDelete(book._id)}
                            > Remove</Button>
                        </Grid.Column>
                    </Results>)}
                </Segment>
        )
    }
}

export default Saved;