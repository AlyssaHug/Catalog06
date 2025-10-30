export default function Book({ book, isLoaned, loanInfo, onReturn, onDelete }) {
    return (
        <article className={`card ${isLoaned ? "loaned" : ""}`}>
            <h3>{book.title}</h3>
            <p className='author'>{book.author}</p>
            {book.year && <p className='year'>{book.year}</p>}

            {isLoaned ? (
                <div className='loan-info'>
                    <p>
                        <strong>Borrower:</strong> {loanInfo.borrower}
                    </p>
                    <p>
                        <strong>Weeks:</strong> {loanInfo.weeks}
                    </p>
                    <button
                        className='return'
                        onClick={onReturn}>
                        Return
                    </button>
                </div>
            ) : null}

            {onDelete && (
                <button
                    className='delete-btn'
                    onClick={onDelete}>
                    Delete
                </button>
            )}
        </article>
    );
}
