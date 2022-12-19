import commentsReducer from "./comments/reducer";
import blogReducer from "./blogs/reducer";
import postsReducer from "./posts/reducer";
import authenticationReducer from "./authentication/reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  comments: commentsReducer,
  posts: postsReducer,
  authentication: authenticationReducer,
  blogs: blogReducer,
});

export default rootReducer;
