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
        const books = this.props.books;
        return (
            <div>
                <div className="bookshelf">
                {
                    this.props.title && <h2 className="bookshelf-title">{this.props.title}</h2>
                }
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            !isEmpty(books) && books.map((book) => (
                                <Book key={book.id} book={book} handleMoveTo={this.handleMoveTo}/>
                            ))
                        }
                    </ol>
                </div>
                </div>
            </div>
        )
    }
}

export default BookShelf;





