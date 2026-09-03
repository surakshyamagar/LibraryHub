import api from "./api";

// Get all categories
export const getCategories = () => {
  return api.get("/categories");
};

// Get single category
export const getCategoryById = (id) => {
  return api.get(`/categories/${id}`);
};

// Create category
export const createCategory = (categoryData) => {
  return api.post("/categories", categoryData);
};

export const updateCategory = (id, categoryData)=> {
    return api.put(`/categories/${id}`, categoryData)
}

