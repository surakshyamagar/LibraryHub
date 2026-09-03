// import api from "./api";

// export const getBooks = () => {
//     return api.get("/books");
// };

// export const getBookById = (id) =>{
//     return api.get(`/books/${id}`);
// };

// export const createBook = (bookData) => {
//     return api.post("/books", bookData);
// };

// export const updateBook = (id, bookData) => {
//     return api.put(`/books/${id}`, bookData);
// };

// export const deleteBook = (id) => {
//   return api.delete(`/books/${id}`);
// };

import api from "./api";

// Get all books
export const getBooks = () => {
  return api.get("/books");
};

// Get single book
export const getBookById = (id) => {
  return api.get(`/books/${id}`);
};

// Create book
export const createBook = (bookData) => {
  return api.post("/books", bookData);
};

// Update book
export const updateBook = (id, bookData) => {
  return api.put(`/books/${id}`, bookData);
};

// Delete book
export const deleteBook = (id) => {
  return api.delete(`/books/${id}`);
};