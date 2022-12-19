import * as React from "react";
import { useSelector } from "react-redux";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { green, red } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

export default function BlogComments(props) {
  const authenticationData = useSelector((state) => state.authentication);
  const { currentUser } = authenticationData;
  const { comments } = props;
  return (
    <>
      <Typography variant="h6" sx={{ ml: 2 }}>
        Comments
      </Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {comments.map((elem) => (
          <ListItem key={elem.id}>
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor:
                    currentUser.id === elem.user.id ? green[400] : red[400],
                }}
                alt={elem.user.name}
                src="/static/images/avatar/2.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              primary={elem.user.name}
              secondary={elem.comment}
              // secondary={elem.date + " " + elem.time}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
