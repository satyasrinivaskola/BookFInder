import React, { useState } from "react";

const Trail=()=>{
const [bookTitle, setBookTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSearch = () => {
    if (!bookTitle.trim()) {
      setMessage("Please enter a book title.");
      setBooks([]);
      return;
    }

    setLoading(true);
    setMessage("");

    let url = `https://openlibrary.org/search.json?title=${bookTitle}`;
    if (authorName.trim()) {
      url += `&author=${authorName}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
          console.log(data)
          console.log("satya")
        if (data.docs && data.docs.length > 0) {
          setBooks(data.docs.slice(0, 10)); // Show top 10 results
          setMessage("");
        } else {
          setBooks([]);
          setMessage("No books found.");
        }
        setLoading(false);
       
      })
       
      .catch((err) => {
        console.error("Error fetching books:", err);
        setMessage("Something went wrong.");
        setLoading(false);
      });
    
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Book Finder</h1>
        <p>Welcome, Alex! Search for books by title and author.</p>

        <input
          type="text"
          placeholder="Enter book title"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter author name (optional)"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        {loading && <p>Loading...</p>}
        {message && <p>{message}</p>}

        <div className="results">
          {books.map((book, index) => (
            <div key={index} className="book-card">
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                />
              ) : (
                <div className="no-cover">No Cover</div>
              )}
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author_name?.join(", ") || "Unknown"}</p>
              <p><strong>First Published:</strong> {book.first_publish_year || "N/A"}</p>
              <p><strong>Availability:</strong> {book.availability ? "Available" : "Check archive.org"}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}
export default Trail;