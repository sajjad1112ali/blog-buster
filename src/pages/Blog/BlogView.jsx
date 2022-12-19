import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

import Loader from "../../components/Loader";

import { getBlogWithComments } from "../../redux";
import BlogDetails from "./BlogDetails";

const BlogView = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blogsData = useSelector((state) => state.blogs);
  const { singleBlog, loading, error, addCommentError } = blogsData;
  useEffect(() => {
    dispatch(getBlogWithComments(id));
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <h2>Blog not found</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <BlogDetails
            blog={singleBlog}
            commentError={addCommentError}
            blogID={id}
          />
        )}
      </Box>
    </div>
  );
};

export default BlogView;
