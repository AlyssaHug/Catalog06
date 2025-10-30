export default function Book({ book, isLoaned, isSelected, onSelect }) {
    const imageUrl = book.imageUrl || book.image;
    return (
        <article
            className={`card ${isLoaned ? "loaned" : ""} ${
                isSelected ? "darkened" : ""
            }`}
            onClick={onSelect}
            style={{ cursor: "pointer" }}>
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={book.title}
                    className='cardImg'
                    onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextElementSibling.style.display = "flex";
                    }}
                />
            ) : null}
            <h3>{book.title}</h3>
            <p className='author'>{book.author}</p>
            {book.year && <p className='year'>{book.year}</p>}
            {isLoaned && <p className='loaned-badge'>On Loan</p>}
        </article>
    );
}
