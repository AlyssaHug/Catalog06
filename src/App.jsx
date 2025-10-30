import "./App.css";
import Button from "./components/Buttons";
import Footer from "./components/Footer";
import Book from "./components/Card";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import LoanDetails from "./components/LoanDetails";

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

    const [selected, setSelected] = useState({});
    /* ---------- Loan actions ---------- */
    const [loans, setLoans] = useState(() => {
        const s = localStorage.getItem("loans");
        return s ? JSON.parse(s) : {};
    });
    useEffect(
        () => localStorage.setItem("loans", JSON.stringify(loans)),
        [loans]
    );
    const [loanedIds, setLoanedIds] = useState(() => {
        const saved = localStorage.getItem("loanedIds");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("loanedIds", JSON.stringify(loanedIds));
    }, [loanedIds]);

    const loanBook = (bookId, borrower, weeks) => {
        setLoans((p) => ({ ...p, [bookId]: { borrower, weeks } }));
    };

    const returnBook = (bookId) => {
        setLoans((p) => {
            const { [bookId]: _, ...rest } = p;
            return rest;
        });
    };
    const [showLoanManager, setShowLoanManager] = useState(false);
    return (
        <div className='app'>
            <Header />
            <main>
                {showLoanManager ? (
                    <LoanDetails
                        books={books}
                        loans={loans}
                        onLoan={loanBook}
                        onReturn={returnBook}
                        onQuit={() => setShowLoanManager(false)}
                    />
                ) : (
                    <>
                        {/* ────── Toolbar ────── */}
                        <div className='toolbar'>
                            <div>
                                <select
                                    className='filter'
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}>
                                    <option value=''>All Authors</option>
                                    {[...authors].map((a) => (
                                        <option
                                            key={a}
                                            value={a}>
                                            {a}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                className='manage'
                                onClick={() => setShowLoanManager(true)}>
                                Manage Loans
                            </button>
                        </div>
                        <div className='content'>
                            <Button
                                books={books}
                                setBooks={setBooks}
                                selectedBookId={selectedBookId}
                                setSelectedBookId={setSelectedBookId}
                            />
                            {/* ────── Catalog ────── */}
                            <div className='books'>
                                {displayedBooks.map((book) => (
                                    <Book
                                        key={book.id}
                                        book={book}
                                        isLoaned={loanedIds.includes(book.id)}
                                        onToggle={() => toggleLoan(book.id)}
                                        selectedBookId={selectedBookId}
                                        setSelectedBookId={setSelectedBookId}
                                    />
                                ))}
                            </div>
                            {displayedBooks.length === 0 && (
                                <p className='empty'>
                                    No books yet – add some!
                                </p>
                            )}
                        </div>
                    </>
                )}
            </main>
            <Footer text='Alyssa Huggins, 2025' />
        </div>
    );
}

export default App;
