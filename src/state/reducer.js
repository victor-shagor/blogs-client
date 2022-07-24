import {
  blogs_fetched,
  blogs_loading,
  blog_fetched,
  blog_loading,
  create_blog,
  create_comment,
  error,
} from "./types";

const initialState = {
  blogs: [],
  loadingBlogs: false,
  blog: {},
  loadingBlog: false,
  comments: [],
  loadingComments: false,
  count: 0,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case error:
      return {
        ...state,
        error: true,
      };
    case blogs_loading:
      return {
        ...state,
        loadingBlogs: true,
        error: null,
      };
    case blogs_fetched:
      return {
        ...state,
        blogs: action.payload,
        count: action.count,
        loadingBlogs: false,
        error: null,
      };
    case blog_loading:
      return {
        ...state,
        loadingBlog: true,
        error: null,
      };
    case blog_fetched:
      return {
        ...state,
        blog: action.payload,
        comments: action.comments,
        loadingBlog: false,
        error: null,
      };
    case create_blog:
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
        count: state.count + 1,
      };
    case create_comment:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    default:
      return state;
  }
};

export default reducer;
