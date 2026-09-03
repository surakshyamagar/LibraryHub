import api from "./api";

export const getDashboardStats = async () => {
  const [
    booksResponse,
    authorsResponse,
    categoriesResponse,
    borrowingsResponse,
  ] = await Promise.all([
    api.get("/books"),
    api.get("/authors"),
    api.get("/categories"),
    api.get("/borrow"),
  ]);

  return {
    books: booksResponse.data,
    authors: authorsResponse.data,
    categories: categoriesResponse.data,
    borrowings: borrowingsResponse.data,
  };
};