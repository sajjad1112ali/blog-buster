const {
  GET_BLOGS_REQUEST,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_FAILURE,
  ADD_BLOG_REQUEST,
  ADD_BLOG_SUCCESS,
  ADD_BLOG_FAILURE,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAILURE,
  GET_SINGLE_BLOG_REQUEST,
  GET_SINGLE_BLOG_SUCCESS,
  GET_SINGLE_BLOG_FAILURE,

  UPDATE_BLOG_REQUEST,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_FAILURE,

  BLOG_COMMENT_REQUEST,
  BLOG_COMMENT_SUCCESS,
  BLOG_COMMENT_FAILURE,
} = require("./types");

const initialState = {
  loading: false,
  isSubmitting: false,
  blogs: [],
  error: "",
  singleBlog: null,
  isEdit: false,
  deleteError: "",
  addCommentError: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
        deleteError: false,
        singleBlog: null,
      };
    case GET_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: action.data,
        error: "",
      };
    case GET_BLOGS_FAILURE:
      return {
        ...state,
        loading: false,
        blogs: [],
        error: action.data,
      };
    case ADD_BLOG_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case ADD_BLOG_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
      };
    case ADD_BLOG_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.data,
      };
    case DELETE_BLOG_REQUEST:
      return {
        ...state,
      };
    case DELETE_BLOG_SUCCESS:
      const { blogs } = state;
      const filteredBlogs = blogs.filter((item) => item.id != action.data);
      return {
        ...state,
        blogs: filteredBlogs,
        deleteError: false,
      };
    case DELETE_BLOG_FAILURE:
      return {
        ...state,
        deleteError: action.data,
      };
    case GET_SINGLE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
        singleBlog: null,
      };
    case GET_SINGLE_BLOG_SUCCESS:
      return {
        ...state,
        singleBlog: action.data,
        loading: false,
      };
    case GET_SINGLE_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        singleBlog: null,
      };
    case UPDATE_BLOG_REQUEST:
      return {
        ...state,
      };
    case UPDATE_BLOG_SUCCESS:
      return {
        ...state,
      };
    case UPDATE_BLOG_FAILURE:
      return {
        ...state,
        error: action.data,
      };

    case BLOG_COMMENT_REQUEST:
      console.log("BLOG_COMMENT_REQUEST");
      return {
        ...state,
      };
    case BLOG_COMMENT_SUCCESS:
      console.log("BLOG_COMMENT_REQUEST");

      return {
        ...state,
      };
    case BLOG_COMMENT_FAILURE:
      console.log("BLOG_COMMENT_FAILURE");

      return {
        ...state,
        addCommentError: action.data,
      };

    default:
      return state;
  }
};
export default reducer;
