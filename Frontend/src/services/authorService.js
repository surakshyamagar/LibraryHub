import api from "./api";

export const getAuthors = () => {
    return api.get("/authors");
};

export const getAuthorById = (id) => {
    return api.get(`/authors/${id}`);
};

export const createAuthor = (authorData) => {
    return api.post("/authors", authorData);
};

export const updateAuthor = (id, authorData) => {
    return api.put(`/authors/put/${id}`, authorData);
};



