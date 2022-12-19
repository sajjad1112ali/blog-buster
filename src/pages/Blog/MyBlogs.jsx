import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Container, Box, Button } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../../redux";

import BlogCard from "./BlogCard";
import Loader from "../../components/Loader";

function MyBlogs() {
  const blogsData = useSelector((state) => state.blogs);
  const { blogs, loading, error } = blogsData;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs("myBlogs"));
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
          <h2>My Blogs</h2>
        </div>
        <div>
          <Button
            variant="contained"
            component={Link}
            to="/blogs/add"
            endIcon={<AddIcon />}
          >
            Add
          </Button>
        </div>
      </Box>
      {loading ? (
        <Loader />
        ) : blogs.length === 0 && !error ? (
          <h2>Blogs not found</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <BlogCard blogs={blogs}  page="myBlogs"/>
      )}
    </Container>
  );
}

export default MyBlogs;
