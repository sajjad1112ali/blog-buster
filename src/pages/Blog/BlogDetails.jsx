import React from "react";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import BlogComments from "./BlogComments";
import Comment from "./Comment";

import { getToken } from "../../redux/utils";
const BlogDetails = ({ blog, commentError, blogID }) => {
  if (!blog) return;
  const { image, title, body, blog_comments } = blog;
  const token = getToken();
  return (
    <>
      <Card sx={{ width: 650 }}>
        <CardActionArea>
          <CardMedia component="img" image={image} alt="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {body}
            </Typography>
          </CardContent>
        </CardActionArea>
        <BlogComments comments={blog_comments} />
        {token ? (
          <Comment
            commentError={commentError}
            blogID={blogID}
            origCom={blog_comments}
          />
        ) : (
          <Typography
            variant="subtitle1"
            sx={{ ml: 2, mb: 2, textAlign: "center" }}
          >
            Kindly login to share your thoughts.
          </Typography>
        )}
      </Card>
    </>
  );
};

export default BlogDetails;
