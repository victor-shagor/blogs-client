import { getBlogs, getBlog, createComment, createBlog } from "./api";
import {
  blogs_fetched,
  blogs_loading,
  blog_loading,
  blog_fetched,
  create_comment,
  create_blog,
  error,
} from "./types";
import { toast } from "react-toastify";

export const fetchBlogs = (page, query) => async (dispatch) => {
  try {
    dispatch({ type: blogs_loading });

    const { data } = await getBlogs(page, query);

    dispatch({
      type: blogs_fetched,
      payload: data.data,
      count: data.count,
    });
  } catch (err) {
    dispatch({
      type: error,
    });
    // toast.error("Failed fetching blogs", {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
  }
};

export const fetchBlog = (blogID) => async (dispatch) => {
  try {
    dispatch({ type: blog_loading });
    let { data } = await getBlog(blogID);
    dispatch({
      type: blog_fetched,
      payload: data.data[0],
      comments: data.data[0].comments.reverse(),
    });
  } catch (err) {
    // toast.error("Failed fetching blog", {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
  }
};

export const createNewComment =
  (blogID, reply, parantID) => async (dispatch) => {
    try {
      const { data } = await createComment(blogID, reply, parantID);

      dispatch({
        type: create_comment,
        payload: data.data,
      });
    } catch (err) {
      toast.error(err?.response?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

export const createNewBlog = (blogDetails) => async (dispatch) => {
  try {
    const { data } = await createBlog(blogDetails);

    dispatch({
      type: create_blog,
      payload: data.data,
    });
  } catch (err) {
    toast.error(err?.response?.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
