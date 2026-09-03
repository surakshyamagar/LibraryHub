import api from "./api";

// Get all borrowings
export const getBorrowings = () => {
  return api.get("/borrow");
};

// Get single borrowing
export const getBorrowingById = (id) => {
  return api.get(`/borrow/${id}`);
};

// Create borrowing
export const createBorrowing = (borrowingData) => {
  return api.post("/borrow", borrowingData);
};

// Update borrowing
export const updateBorrowing = (id, borrowingData) => {
  return api.put(`/borrow/${id}`, borrowingData);
};

// Return book
export const returnBorrowing = (id) => {
  return api.patch(`/borrow/${id}/return`);
};

// Search borrowings
export const searchBorrowings = (search) => {
  return api.get(`/borrow/search?search=${encodeURIComponent(search)}`);
};

// Get paginated borrowings
export const paginateBorrowings = (page = 1, limit = 10) => {
    return api.get("/borrow/paginate", {
        params: {
            page,
            limit,
        },
    });
};

// Get logged-in member's borrowings
export const getMyBorrowings = () => {
  return api.get("/borrow/my");
};