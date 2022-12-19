import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import PrivateLayout from "./pages/layouts/private/PrivateLayout";
import PublicLayout from "./pages/layouts/public/PublicLayout";

import Chat from "./pages/Chat/Chat";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Posts from "./pages/Posts/Posts";

// My Blogs
import MyBlogs from "./pages/Blog/MyBlogs";
import Blogs from "./pages/Blog/Blogs";
import Add from "./pages/Blog/Add";
import BlogView from "./pages/Blog/BlogView";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/view/:id" element={<BlogView />} />
        </Route>
        <Route path="/chat" element={<PrivateLayout />}>
          <Route index element={<Chat />} />
        </Route>
        <Route path="/blogs" element={<PrivateLayout />}>
          <Route index path="my" element={<MyBlogs />} />
          <Route path="add" element={<Add />} />
          <Route path="edit/:id" element={<Add />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Provider>
  );
}

export default App;
