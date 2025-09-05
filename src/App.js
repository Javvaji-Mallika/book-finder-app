import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) {
      console.error(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Book Finder</h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchBooks()}
          placeholder="Search books..."
          className="border border-gray-400 p-2 rounded-l-md w-1/3"
        />
        <button
          onClick={searchBooks}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
            <div key={book.id} className="bg-white p-4 rounded shadow">
              <h2 className="font-bold mb-2">{book.volumeInfo.title}</h2>
              <p className="text-sm mb-2">
                {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
              </p>
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  className="w-full h-auto mb-2"
                />
              )}
              {book.volumeInfo.infoLink && (
                <a
                  href={book.volumeInfo.infoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  View Book
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No results found</p>
      )}
    </div>
  );
}

export default App;
