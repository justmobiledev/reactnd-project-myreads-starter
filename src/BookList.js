import React from 'react'
import BookShelf from './BookShelf'

class BookList extends React.Component {

    constructor(props) {
        super(props);

        this.handleMoveTo = this.handleMoveTo.bind(this);
    }

    handleMoveTo = (book, shelf) => {
        this.props.handleMoveTo(book, shelf);
    }

    render() {
        // Create lists of each book shelf
        const currentlyReadingList = this.props.books.filter((book) => book.shelf === 'currentlyReading') || [];
        const wantToReadList = this.props.books.filter((book) => book.shelf === 'wantToRead') || [];
        const readList = this.props.books.filter((book) => book.shelf === 'read') || [];

        return (
            <div className="list-books">    
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <BookShelf title="Currently Reading" books={currentlyReadingList} handleMoveTo={this.handleMoveTo}/>
                    <BookShelf title="Want To Read" books={wantToReadList} handleMoveTo={this.handleMoveTo}/>
                    <BookShelf title="Read" books={readList} handleMoveTo={this.handleMoveTo}/>
                </div>
            </div>  
        )
    }
}

export default BookList;