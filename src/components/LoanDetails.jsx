import Book from "./Card";
import { useState } from "react";

export default function LoanDetails({
    books,
    loans,
    onLoan,
    onReturn,
    onQuit,
}) {
    const [borrower, setBorrower] = useState("");
    const [selectedBookId, setSelectedBookId] = useState("");
    const [weeks, setWeeks] = useState("1");
    const [toast, setToast] = useState(""); // <-- success message

    // Only books NOT already loaned
    const availableBooks = books.filter((book) => !loans[book.id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // ---- validation ----
        if (!borrower.trim() || !selectedBookId) return;

        // ---- CALL PARENT ----
        onLoan(selectedBookId, borrower.trim(), Number(weeks));

        // ---- SUCCESS FEEDBACK ----
        setToast(
            `"${
                books.find((book) => book.id === selectedBookId).title
            }" loaned to ${borrower}!`
        );

        // ---- reset form ----
        setBorrower("");
        setSelectedBookId("");
        setWeeks("1");

        // hide toast after 2s
        setTimeout(() => setToast(""), 2000);
    };

    // ---- books that are loaned ----
    const loanedBooks = Object.entries(loans).map(([id, info]) => ({
        ...books.find((book) => book.id === id),
        loanInfo: info,
    }));

    return (
        <div className='loan-manager'>
            {/* ────── Header ────── */}
            <header className='loan-header'>
                <h1>Manage Loans</h1>
                <button
                    className='manage'
                    onClick={onQuit}>
                    QUIT
                </button>
            </header>

            {/* ────── Toast ────── */}
            {toast && <div className='toast'>{toast}</div>}

            {/* ────── Loan Form ────── */}
            <section className='loan-section'>
                <form
                    onSubmit={handleSubmit}
                    className='loan-form'>
                    <div className='form-row'>
                        <label>Borrower</label>
                        <input
                            className='input'
                            type='text'
                            value={borrower}
                            onChange={(e) => setBorrower(e.target.value)}
                            placeholder='John Smith'
                            required
                        />
                    </div>

                    <div className='form-row'>
                        <label>Book:</label>
                        <select
                            className='input'
                            value={selectedBookId}
                            onChange={(e) => setSelectedBookId(e.target.value)}
                            required>
                            <option
                                value=''
                                disabled>
                                Select a book
                            </option>
                            {availableBooks.map((book) => (
                                <option
                                    key={book.id}
                                    value={book.id}>
                                    {book.title} – {book.author}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='form-row'>
                        <label>Loan period: (in weeks)</label>
                        <input
                            className='input'
                            type='number'
                            min='1'
                            value={weeks}
                            onChange={(e) => setWeeks(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type='submit'
                        className='submit'>
                        SUBMIT
                    </button>
                </form>
            </section>

            {/* ────── Currently on loan ────── */}
            <section className='loaned-section'>
                <h2>Currently on loan</h2>
                {loanedBooks.length === 0 ? (
                    <p className='empty-msg'>No books are currently loaned.</p>
                ) : (
                    <div className='books'>
                        {loanedBooks.map((book) => (
                            <Book
                                key={book.id}
                                book={book}
                                isLoaned={true}
                                loanInfo={book.loanInfo}
                                onReturn={() => onReturn(book.id)}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
