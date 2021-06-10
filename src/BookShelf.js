import React from 'react'
import {isEmpty} from 'lodash/fp';
import Book from './Book';

class BookShelf extends React.Component {

    constructor(props) {
        super(props);

        this.handleMoveTo = this.handleMoveTo.bind(this);
    }

    handleMoveTo = (book, shelf) => {
        this.props.handleMoveTo(book, shelf);
    }

    render() {
        return (
            <div>
                <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            !isEmpty(this.props.books) ? this.props.books.map((book, index) => (
                                <Book key={index} book={book} handleMoveTo={this.handleMoveTo}/>
                            )) : null
                        }
                    </ol>
                </div>
                </div>
            </div>
        )
    }
}

export default BookShelf;





