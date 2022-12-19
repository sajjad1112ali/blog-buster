import axios from "axios";
import { getTokenHeader } from "../utils";

const REACT_APP_APIS_URL = process.env.REACT_APP_APIS_URL;

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

const fetchBlogsRequest = () => {
  return {
    type: GET_BLOGS_REQUEST,
  };
};

const fetchBlogsSuccess = (blogs) => {
  return {
    type: GET_BLOGS_SUCCESS,
    data: blogs,
  };
};

const fetchBlogsFailure = (error) => {
  return {
    type: GET_BLOGS_FAILURE,
    data: error,
  };
};

// Add Blog

const addBlogRequest = (blog) => {
  return {
    type: ADD_BLOG_REQUEST,
    data: blog,
  };
};

const addBlogSuccess = (blog) => {
  return {
    type: ADD_BLOG_SUCCESS,
    data: blog,
  };
};

const addBlogFailure = (error) => {
  return {
    type: ADD_BLOG_FAILURE,
    data: error,
  };
};

const updateBlogRequest = (blog) => {
  return {
    type: UPDATE_BLOG_REQUEST,
    data: blog,
  };
};

const updateBlogSuccess = (blog) => {
  return {
    type: UPDATE_BLOG_SUCCESS,
    data: blog,
  };
};

const updateBlogFailure = (error) => {
  return {
    type: UPDATE_BLOG_FAILURE,
    data: error,
  };
};

const deleteBlogRequest = (id) => {
  return {
    type: DELETE_BLOG_REQUEST,
    data: id,
  };
};

const deleteBlogSuccess = (id) => {
  return {
    type: DELETE_BLOG_SUCCESS,
    data: id,
  };
};
const deleteBlogFailure = (error) => {
  return {
    type: DELETE_BLOG_FAILURE,
    data: error,
  };
};

const getSingleBlogRequest = (id) => {
  return {
    type: GET_SINGLE_BLOG_REQUEST,
    data: id,
  };
};

const getSingleBlogSuccess = (id) => {
  return {
    type: GET_SINGLE_BLOG_SUCCESS,
    data: id,
  };
};
const getSingleBlogFailure = (id) => {
  return {
    type: GET_SINGLE_BLOG_FAILURE,
    data: id,
  };
};

const blogCommentRequest = (data) => {
  return {
    type: BLOG_COMMENT_REQUEST,
    data,
  };
};

const blogCommentSuccess = (data) => {
  return {
    type: BLOG_COMMENT_SUCCESS,
    data,
  };
};
const blogCommentFailure = (error) => {
  return {
    type: BLOG_COMMENT_FAILURE,
    data: error,
  };
};

const fetchBlogs = (type) => {
  let headers = {};
  const url =
    type !== "myBlogs"
      ? `${REACT_APP_APIS_URL}/blogs`
      : `${REACT_APP_APIS_URL}/blogs/get/my`;
  if (type === "myBlogs") {
    headers = getTokenHeader();
  }

  return (dispatch) => {
    dispatch(fetchBlogsRequest());
    setTimeout(() => {
      axios
        .get(url, { headers: { ...headers } })
        .then((response) => {
          dispatch(fetchBlogsSuccess(response.data));
        })
        .catch((error) => {
          const msg =
            error.code === "ERR_NETWORK"
              ? error.message
              : error.response.data.message;

          dispatch(fetchBlogsFailure(msg));
        });
    }, 1000);
  };
};

const restForm = (formProps) => {
  formProps.setSubmitting(false);
  formProps.resetForm();
};

const addBlog = (data, formFormikProps, navigate) => {
  const headers = getTokenHeader();
  return (dispatch) => {
    dispatch(addBlogRequest());
    setTimeout(() => {
      axios
        .post(`${REACT_APP_APIS_URL}/blogs/add`, data, {
          headers: { ...headers, "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          dispatch(addBlogSuccess(response.data));
          restForm(formFormikProps);
          navigate("/blogs/my");
        })
        .catch((error) => {
          dispatch(addBlogFailure(error.response.data.message));
          formFormikProps.setSubmitting(false);
        });
    }, 2000);
  };
};

const deleteBlog = (id) => {
  let headers = getTokenHeader();

  return (dispatch) => {
    dispatch(deleteBlogRequest(id));
    setTimeout(() => {
      axios
        .delete(`${REACT_APP_APIS_URL}/blogs/${id}`, {
          headers: { ...headers },
        })
        .then((response) => {
          console.log(response.data);
          dispatch(deleteBlogSuccess(id));
        })
        .catch((error) => {
          dispatch(deleteBlogFailure(error.response.data.message));
        });
    }, 1000);
  };
};

const getSingleBlog = (id, setlogoFile) => {
  let headers = getTokenHeader();

  return (dispatch) => {
    dispatch(getSingleBlogRequest(id));
    setTimeout(() => {
      axios
        .get(`${REACT_APP_APIS_URL}/blogs/${id}`, {
          headers: { ...headers },
        })
        .then((response) => {
          console.log(response.data);
          dispatch(getSingleBlogSuccess(response.data));
          setlogoFile && setlogoFile(response.data.image);
        })
        .catch((error) => {
          dispatch(
            getSingleBlogFailure({ message: error.response.data.message, id })
          );
        });
    }, 1000);
  };
};

const updateBlog = (id, data, formFormikProps, navigate) => {
  const headers = getTokenHeader();
  return (dispatch) => {
    dispatch(updateBlogRequest());
    setTimeout(() => {
      axios
        .put(`${REACT_APP_APIS_URL}/blogs/${id}`, data, {
          headers: { ...headers, "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          restForm(formFormikProps);
          dispatch(updateBlogSuccess(response.data));
          navigate("/blogs/my");
        })
        .catch((error) => {
          dispatch(updateBlogFailure(error.response.data.message));
          formFormikProps.setSubmitting(false);
        });
    }, 2000);
  };
};

const getBlogWithComments = (id) => {
  return (dispatch) => {
    dispatch(getSingleBlogRequest(id));
    setTimeout(() => {
      axios
        .get(`${REACT_APP_APIS_URL}/blogs/${id}/comments`)
        .then((response) => {
          dispatch(getSingleBlogSuccess(response.data));
        })
        .catch((error) => {
          dispatch(
            getSingleBlogFailure({ message: error.response.data.message })
          );
        });
    }, 1000);
  };
};

const addBlogComment = (data, formFormikProps) => {
  const headers = getTokenHeader();
  return (dispatch) => {
    dispatch(blogCommentRequest());
    axios
      .post(`${REACT_APP_APIS_URL}/blogs/comment`, data, {
        headers: { ...headers },
      })
      .then((response) => {
        dispatch(blogCommentSuccess(response.data));
        restForm(formFormikProps);
      })
      .catch((error) => {
        console.log(error.response.data);
        dispatch(blogCommentFailure(error.response.data.message));
        formFormikProps.setSubmitting(false);
      });
  };
};

export {
  fetchBlogs,
  addBlog,
  addBlogRequest,
  deleteBlog,
  getSingleBlog,
  updateBlog,
  getBlogWithComments,
  addBlogComment,
};
