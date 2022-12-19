import React from "react";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

function PostCard({ post }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default PostCard;
