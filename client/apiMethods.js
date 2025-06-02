// API Methods for Bookstore Client
class BookstoreAPI {
    constructor(baseURL = '/api') {
      this.baseURL = baseURL;
    }
  
    // Helper method for making HTTP requests
    async makeRequest(endpoint, options = {}) {
      const url = `${this.baseURL}${endpoint}`;
      const defaultOptions = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const config = { ...defaultOptions, ...options };
      
      try {
        const response = await fetch(url, config);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }
        
        return data;
      } catch (error) {
        console.error('API Request failed:', error);
        throw error;
      }
    }
  
    // Book API Methods
    async getAllBooks(params = {}) {
      const searchParams = new URLSearchParams(params);
      const endpoint = `/books${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
      return this.makeRequest(endpoint);
    }
  
    async getBookById(id) {
      return this.makeRequest(`/books/${id}`);
    }
  
    async createBook(bookData) {
      return this.makeRequest('/books', {
        method: 'POST',
        body: JSON.stringify(bookData),
      });
    }
  
    async updateBook(id, bookData) {
      return this.makeRequest(`/books/${id}`, {
        method: 'PUT',
        body: JSON.stringify(bookData),
      });
    }
  
    async deleteBook(id) {
      return this.makeRequest(`/books/${id}`, {
        method: 'DELETE',
      });
    }
  
    async searchBooks(query) {
      return this.getAllBooks({ search: query });
    }
  
    async getBooksByCategory(category) {
      return this.getAllBooks({ category });
    }
  
    // User API Methods
    async getAllUsers() {
      return this.makeRequest('/users');
    }
  
    async getUserById(id) {
      return this.makeRequest(`/users/${id}`);
    }
  
    async createUser(userData) {
      return this.makeRequest('/users', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    }
  
    async updateUser(id, userData) {
      return this.makeRequest(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      });
    }
  
    async deleteUser(id) {
      return this.makeRequest(`/users/${id}`, {
        method: 'DELETE',
      });
    }
  }
  
  // Create a global instance of the API
  const api = new BookstoreAPI();
  
  // Example usage functions that can be called from the console or other scripts
  const BookstoreActions = {
    // Book actions
    async displayAllBooks() {
      try {
        const response = await api.getAllBooks();
        console.log('All Books:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching books:', error.message);
      }
    },
  
    async displayBook(id) {
      try {
        const response = await api.getBookById(id);
        console.log('Book:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching book:', error.message);
      }
    },
  
    async addNewBook(title, author, price, isbn = '', category = '', stock = 0, description = '') {
      try {
        const bookData = { title, author, price, isbn, category, stock, description };
        const response = await api.createBook(bookData);
        console.log('Book added:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error adding book:', error.message);
      }
    },
  
    async searchForBooks(query) {
      try {
        const response = await api.searchBooks(query);
        console.log(`Search results for "${query}":`, response.data);
        return response.data;
      } catch (error) {
        console.error('Error searching books:', error.message);
      }
    },
  
    // User actions
    async displayAllUsers() {
      try {
        const response = await api.getAllUsers();
        console.log('All Users:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    },
  
    async addNewUser(username, email, name, role = 'customer') {
      try {
        const userData = { username, email, name, role };
        const response = await api.createUser(userData);
        console.log('User added:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error adding user:', error.message);
      }
    }
  };
  
  // Make API and actions available globally (for browser console usage)
  if (typeof window !== 'undefined') {
    window.BookstoreAPI = BookstoreAPI;
    window.api = api;
    window.BookstoreActions = BookstoreActions;
  }
  
  // Export for Node.js environments
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BookstoreAPI, BookstoreActions };
  }