// Sample book data
let books = [
    {
      id: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "978-0-06-112008-4",
      price: 12.99,
      category: "Fiction",
      stock: 15,
      description: "A classic novel exploring racial injustice in the American South."
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      isbn: "978-0-452-28423-4",
      price: 13.99,
      category: "Fiction",
      stock: 8,
      description: "A dystopian social science fiction novel about totalitarian control."
    },
    {
      id: 3,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0-7432-7356-5",
      price: 11.99,
      category: "Fiction",
      stock: 12,
      description: "A story of decadence and excess in Jazz Age America."
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isbn: "978-0-14-143951-8",
      price: 10.99,
      category: "Romance",
      stock: 20,
      description: "A romantic novel about manners, upbringing, and marriage."
    },
    {
      id: 5,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      isbn: "978-0-316-76948-0",
      price: 14.99,
      category: "Fiction",
      stock: 6,
      description: "A controversial novel about teenage rebellion and alienation."
    }
  ];
  
  // Helper functions for book operations
  const bookOperations = {
    // Get all books
    getAllBooks: () => books,
  
    // Get book by ID
    getBookById: (id) => books.find(book => book.id === parseInt(id)),
  
    // Add new book
    addBook: (bookData) => {
      const newBook = {
        id: Math.max(...books.map(b => b.id)) + 1,
        ...bookData,
        stock: bookData.stock || 0
      };
      books.push(newBook);
      return newBook;
    },
  
    // Update book
    updateBook: (id, updateData) => {
      const bookIndex = books.findIndex(book => book.id === parseInt(id));
      if (bookIndex === -1) return null;
      
      books[bookIndex] = { ...books[bookIndex], ...updateData };
      return books[bookIndex];
    },
  
    // Delete book
    deleteBook: (id) => {
      const bookIndex = books.findIndex(book => book.id === parseInt(id));
      if (bookIndex === -1) return null;
      
      const deletedBook = books[bookIndex];
      books.splice(bookIndex, 1);
      return deletedBook;
    },
  
    // Search books
    searchBooks: (query) => {
      const searchTerm = query.toLowerCase();
      return books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
      );
    },
  
    // Get books by category
    getBooksByCategory: (category) => {
      return books.filter(book => 
        book.category.toLowerCase() === category.toLowerCase()
      );
    }
  };
  
  module.exports = bookOperations;