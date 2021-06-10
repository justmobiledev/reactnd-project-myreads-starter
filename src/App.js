import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import BookList from './BookList'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  refreshBookList = () => {
    BooksAPI.getAll().then((res) => {
      console.log(res);
      this.setState({books: res});
    }).catch((error) => {
      alert('An error occurred retrieving books from the server. Please check your network connection and try again');
    });
  }

  componentDidMount() { 
    this.refreshBookList();
  }

  handleMoveTo = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      this.refreshBookList();
    }).catch((error) => {
      alert('An error occurred updating the book shelf. Please check your network connection and try again');
    });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
         <SearchPage />
        ) : (
          <div>
            <BookList books={this.state.books} handleMoveTo={this.handleMoveTo}/>
             
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
