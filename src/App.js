import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import BookList from './BookList'
import {Switch, Route, Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  onRouteChanged(){
    this.refreshBookList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  refreshBookList = () => {
    BooksAPI.getAll().then((res) => {
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
    const { history } = this.props;
    return (
      <div className="app">
        {/* Routes */}
        <Switch>
          <Route exact path="/">
            <div>
              <BookList books={this.state.books} handleMoveTo={this.handleMoveTo}/>
              <div className="open-search">
                <Link to="/search" className="button_search">Add a book</Link>
              </div>
            </div>
          </Route>
          <Route path="/search">
            <SearchPage history={history}/>
          </Route>
        </Switch>
      </div>
    )
  }
}

export default withRouter(BooksApp)
