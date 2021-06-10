import React from 'react'
import {first} from 'lodash/fp';

class Book extends React.Component {

    constructor(props) {
        super(props);

        this.title = this.props.book.title;
        this.authors = first(this.props.book.authors);
        this.coverImageURL = `url(${this.props.book.imageLinks.smallThumbnail})`;
        this.shelf = this.props.book.shelf;

        this.handleMoveTo = this.handleMoveTo.bind(this);
    }

    handleMoveTo = (event) => {
        const shelf = event.target.value;
        const book = {...this.props.book, shelf: shelf};
        this.props.handleMoveTo(book, shelf);
    }

    render() {
        return (
            <li>
                <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: this.coverImageURL }}></div>
                <div className="book-shelf-changer">
                    <select onChange={this.handleMoveTo} value={this.shelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{this.title}</div>
                <div className="book-authors">{this.authors}</div>
            </div>
        </li>
        )
    }
}

export default Book;