import React from 'react'
import {Link} from 'react-router-dom'
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI'

class SearchPage extends React.Component {

    state = {
        books: []
      }

    constructor(props) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
        this.handleMoveTo = this.handleMoveTo.bind(this);
    }

    handleSearch = (event) => {
        const query = event.target.value;
        if (! query || query.length < 2) {
            this.setState({books: []});
            return;
        }

        // Send search request
        BooksAPI.search(query).then((res) => {
            this.setState({books: res});
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
                <BookShelf title='' books={this.state.books} handleMoveTo={this.handleMoveTo}/>
            </div>
          </div>
        )
    }
}

export default SearchPage;