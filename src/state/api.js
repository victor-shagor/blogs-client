import axios from "axios";

const url = process.env.REACT_APP_API_URL;
export const getBlogs = async (page, query) => {
  try {
    const response = await axios.get(
      `${url}/blogs/?page=${page}&query=${query}`
    );
    return response;
  } catch (err) {
    throw new Error(err.response?.message);
  }
};

export const getBlog = async (blogID) => {
  try {
    const response = await axios.get(`${url}/blog/${blogID}`);
    return response;
  } catch (err) {
    throw new Error(err.response?.message);
  }
};

export const getComments = async (blogID) => {
  try {
    const response = await axios.get(`${url}/blog/comments/${blogID}`);
    return response;
  } catch (err) {
    throw new Error(err.response?.message);
  }
};

export const createBlog = async (blogDetails) => {
  try {
    const response = await axios.post(`${url}/blog`, blogDetails);
    return response;
  } catch (err) {
    throw new Error(err.response?.message);
  }
};

export const createComment = async (blogID, comment, parentId) => {
  try {
    const response = await axios.post(`${url}/blog/comment/${blogID}`, {
      ...comment,
      parentId,
    });
    return response;
  } catch (err) {
    throw new Error(err.response?.message);
  }
};
