import React, { useEffect } from "react";
import { Container, Box } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../../redux";

import BlogCard from "./BlogCard";
import Loader from "../../components/Loader";

function Blogs() {
  const blogsData = useSelector((state) => state.blogs);
  const { blogs, loading, error } = blogsData;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2>Blogs</h2>
        </div>
      </Box>
      {loading ? (
        <Loader />
      ) : blogs.length === 0 && !error ? (
        <h2>Blogs not found</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <BlogCard blogs={blogs} page="home"/>
      )}
    </Container>
  );
}

export default Blogs;
