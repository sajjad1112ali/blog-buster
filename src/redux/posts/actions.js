import axios from "axios";
const {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
} = require("./types");

const fetchPostsRequest = () => {
  return {
    type: FETCH_POSTS_REQUEST,
  };
};

const fetchPostsSuccess = (posts) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    data: posts,
  };
};

const fetchPostsFailure = (error) => {
  return {
    type: FETCH_POSTS_FAILURE,
    data: error,
  };
};

const fetchPosts = () => {
  return (dispatch) => {
    dispatch(fetchPostsRequest());
    setTimeout(() => {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          dispatch(fetchPostsSuccess(response.data));
        })
        .catch((error) => {
          dispatch(fetchPostsFailure(error.message));
        });
    }, 1000);
  };
};

export { fetchPosts };
