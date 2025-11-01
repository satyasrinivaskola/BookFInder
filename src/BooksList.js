  // import React from "react";
  import {useState,useEffect} from "react";



  const BooksList = ()=>{
      const[bookTitle,setBookTitle]=useState("");
  const[booklist,setBooklist]=useState(false);
    const [books, setBooks] = useState([]);

    useEffect(() => {
    if (booklist) {
      fetch(`https://openlibrary.org/search.json?title=${bookTitle}`)
        .then((res) => res.json())
        .then((data) => {
          const filteredBooks = data.docs.filter((book) =>
            book.title.toLowerCase().includes(bookTitle.toLowerCase())
          );
          setBooks(filteredBooks.slice(0, 10)); // Show top 10 matches
        })
        .catch((err) => console.error(err));
    }
  }, [booklist]);

  const Handleclick=()=>{
  setBooklist(true)
  console.log({books});
  console.log("handleclick worked");



  }
      return(
      <div className="Main-Container">
        <div className="top-content">
          <h1>Book Finder</h1>
          <h2>Hello Alex,Welcome to  BookList</h2>
          <p>BookList is digital library ,A single book can change everything — your mind, your heart, your path.</p>
      <label>Enter Book Name</label>
  
      <input type="text" onChange={(e)=>setBookTitle(e.target.value)}></input>
      <button onClick={Handleclick}>Search</button>
</div>

      {booklist
      &&(<div>
        {books.length>0?(books.map((book)=>(
          <div className="book-card" key={book.key}>
             <h1>Title: {book.title}</h1>
               
        <h3>Author Name: {book.author_name}</h3>
        {book.cover_i ? (
    <img
      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
      alt={`Cover of ${book.title}`}
      style={{ width: "150px", height: "auto", marginTop: "10px" }}
    />
  ) : (
    <p>No cover image available</p>
  )}
         </div>
        
        ))):<h2>No Books Found</h2>}
       
       </div>
     )  
    
  }
    </div>
      )            }

export default BooksList;