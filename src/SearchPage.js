import React from 'react'
import {Link} from 'react-router-dom'
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI'
import { isEmpty } from 'lodash';

class SearchPage extends React.Component {

    state = {
        books: [],
        error: ''
      }

    constructor(props) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
        this.handleMoveTo = this.handleMoveTo.bind(this);
    }

    categorizeBooks = (books, shelfBooks) => {
        let categorizedBooks = [];
        if (isEmpty(shelfBooks)) {
            categorizedBooks = books;
        }

        for (const book of books) {
            const categorizedBook = {...book};
            const shelfBook = shelfBooks.find((b) => b.id === book.id);
            if (shelfBook) {
                categorizedBook.shelf = shelfBook.shelf;
            }
            else {
                categorizedBook.shelf = 'none';
            }
            categorizedBooks.push(categorizedBook);
        }

        return categorizedBooks;
    }

    handleSearch = (event) => {
        const shelfBooks = this.props.books;
        this.setState({error: ''});
        const query = event.target.value;
        if (! query || query.length < 2) {
            this.setState({books: []});
            return;
        }

        // Send search request
        BooksAPI.search(query).then((res) => {
            // Handle no results
            if (res.error) {
                let errorMessage = res.error;
                if (res.error === 'empty query') {
                    errorMessage = 'Your search term did not result any results';
                }
               this.setState({error: errorMessage});
            }
            else {
                // Update results
                this.setState({error: ''});
                
                // Categorize books
                const bookResults = res;
                const categorizedBooks = this.categorizeBooks(bookResults,  shelfBooks);

                this.setState({books: categorizedBooks});
            }
          }).catch((error) => {
            alert('An error occurred searching the book list. Please check your network connection and try again');
          });
    }

    handleMoveTo = (book, shelf) => {
        BooksAPI.update(book, shelf).then((res) => {
           this.props.history.goBack();
        }).catch((error) => {
          alert('An error occurred updating the book shelf. Please check your network connection and try again');
        });
      }

    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={this.handleSearch}/>
              </div>
            </div>
            <div className="search-books-results">
                {
                    this.state.error && <p>{this.state.error}</p>
                }
                {!isEmpty(this.state.books) &&
                    <BookShelf title="" books={this.state.books} handleMoveTo={this.handleMoveTo}/>
                }
            </div>
          </div>
        )
    }
}

export default SearchPage;