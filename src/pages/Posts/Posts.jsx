import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Grid } from "@mui/material";

import { fetchPosts } from "../../redux";
import PostCard from "./PostCard";
import Loader from "../../components/Loader";

function Posts() {
  const postsData = useSelector((state) => state.posts);
  const { posts, loading, error } = postsData;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid container spacing="20">
        {loading ? (
          <Loader />
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          posts.map((post) => (
            <Grid key={post.id} item xs={12} md={6} lg={4}>
              <PostCard post={post} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default Posts;
