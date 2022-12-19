import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import {
  Avatar,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardHeader,
  Box,
  Menu,
  MenuItem,
  Alert,
} from "@mui/material";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { deleteBlog } from "../../redux";

const BlogCard = (props) => {
  const navigate = useNavigate();

  const blogsData = useSelector((state) => state.blogs);
  const { loading, deleteError } = blogsData;
  const dispatch = useDispatch();

  const { blogs, page } = props;
  const isHomePage = page === "home";

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeBlog, setActiveBlog] = useState(null);

  const MyOptions = ["Edit", "Delete"];

  const handleClick = (event, id) => {
    setActiveBlog(id);
    setAnchorEl(event.currentTarget);
  };

  const handleBlogMenuClick = (event) => {
    const [editText] = MyOptions;
    const isEdit =
      event.target.getAttribute("data-action").toLowerCase() ===
      editText.toLowerCase();

    isEdit
      ? navigate(`/blogs/edit/${activeBlog}`)
      : dispatch(deleteBlog(activeBlog));
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {deleteError && (
        <Alert severity="error" sx={{ m: 1 }}>
          {deleteError}
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          alignContent: "stretch",
        }}
      >
        {blogs.map((elem) => {
          const { id, title, image, body, date, user } = elem;
          const { name } = user;
          const actionDetails = !isHomePage ? (
            <>
              <IconButton
                aria-label="more"
                onClick={(e) => handleClick(e, id)}
                aria-haspopup="true"
                aria-controls="long-menu"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                onClose={handleClose}
                open={open}
              >
                {MyOptions.map((option) => {
                  return (
                    <MenuItem
                      key={`${option} - ${elem.id}`}
                      data-action={option}
                      onClick={(e) => {
                        handleClose();
                        handleBlogMenuClick(e);
                      }}
                    >
                      {option}
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          ) : undefined;
          return (
            <Card sx={{ maxWidth: 345, minWidth: 345, m: 1 }} key={id}>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[400] }}
                    alt={name}
                    src="/static/images/avatar/2.jpg"
                  />
                }
                action={actionDetails}
                title={name}
                subheader={date}
              />
              <CardActionArea component={Link} to={`/blogs/view/${id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {body}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
    </div>
  );
};

export default BlogCard;
