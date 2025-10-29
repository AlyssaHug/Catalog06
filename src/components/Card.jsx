import { useState } from "react";

function Book({ book, setSelectedBookId, selectedBookId }) {
    function handleClick() {
        setSelectedBookId(book.id === selectedBookId ? null : book.id);
    }

    return (
        <div
            className={`card ${book.id === selectedBookId ? "darkened" : ""}`}
            onClick={handleClick}
            key={book.id}>
            <img
                className='cardImg'
                src={book.image || null}
                alt={book.title || "Book Cover"}
            />
            <h3 className='bk-price'>{book.price}</h3>
            <h3 className='bk-author'>By: {book.author}</h3>
            <h3 className='learn'>
                <a
                    href={book.url}
                    target='_blank'>
                    Learn More
                </a>
            </h3>
        </div>
    );
}

export default Book;
