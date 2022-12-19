import { GET_BLOGS, ADD_BLOG } from "./types";

const blogs = [
  {
    id: 13,
    user_id: 15,
    title: "Some Title",
    body: "Some random description about the blog you want to save",
    image: "http://127.0.0.1:4000/uploads/1667914678704.png",
    date: "Nov 08, 2022",
    time: "01:37 PM",
  },
  {
    id: 14,
    user_id: 15,
    title: "Some Title 14",
    body: "Some random description about the blog you want to save",
    image: "http://127.0.0.1:4000/uploads/1667914678705.png",
    date: "Nov 08, 2022",
    time: "01:37 PM",
  },
];

const initialState = {
  blogs: blogs,
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
      };
    case ADD_BLOG:
      const newCommnet = {
        id: Date.now(),
        name: "James",
        time: Date.now() / 1000,
        message: action.data.message,
      };
      return {
        ...state,
        commnets: [...state.commnets, newCommnet],
      };

    default:
      return state;
  }
};

export default blogReducer;
