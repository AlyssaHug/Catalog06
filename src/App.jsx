import "./App.css";
import Button from "./components/Buttons";
import Footer from "./components/Footer";
import Book from "./components/Card";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function App() {
    const [books, setBooks] = useState(() => {
        const savedBooks = localStorage.getItem("books");
        return savedBooks ? JSON.parse(savedBooks) : [];
    });
    const [filter, setFilter] = useState("");
    const [selectedBookId, setSelectedBookId] = useState(null);

    // Save books to localStorage whenever books state changes
    useEffect(() => {
        localStorage.setItem("books", JSON.stringify(books));
    }, [books]);

    // Get unique authors for filtering
    const authors = new Set(books.map((book) => book?.author).filter((p) => p));

    // Filter books by author
    const displayedBooks = filter
        ? books.filter((book) => book.author === filter)
        : books;

    return (
        <main>
            <Header />

            <div className='filter'>
                <select
                    id='author-filter'
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}>
                    <option
                        className='filter-text'
                        value=''>
                        All Authors
                    </option>
                    {[...authors].map((author) => (
                        <option
                            key={author}
                            value={author}>
                            {author}
                        </option>
                    ))}
                </select>
            </div>
            <div className='content'>
                <Button
                    books={books}
                    setBooks={setBooks}
                    selectedBookId={selectedBookId}
                    setSelectedBookId={setSelectedBookId}
                />
                <div className='books'>
                    {displayedBooks.map((book) => (
                        <Book
                            key={book.id}
                            book={book}
                            selectedBookId={selectedBookId}
                            setSelectedBookId={setSelectedBookId}
                        />
                    ))}
                </div>
            </div>
            <Footer text='Alyssa Huggins, 2025' />
        </main>
    );
}

export default App;
