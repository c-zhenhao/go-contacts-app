import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Grid,
  ListItem,
  IconButton,
  useEventCallback,
} from "@mui/material";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

const ContactCard = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <ListItem
        button
        onClick={() => {
          navigate(`/view`);
        }}
      >
        <Grid
          container
          direction="row"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid item xs={1} sx={{ ml: 1 }}>
            <Avatar />
          </Grid>
          <Grid item xs={5}>
            I put in a really really long name
          </Grid>
          <Grid item xs={4}>
            12345678
          </Grid>

          <Grid
            item
            xs={1}
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <IconButton
              color="success"
              size="medium"
              onClick={(event) => {
                event.stopPropagation();

                console.log("edit clicked");
                navigate("/edit");
              }}
            >
              <ModeEditIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              color="error"
              size="medium"
              onClick={(event) => {
                event.stopPropagation();

                console.log("delete clicked");
                navigate("/");
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      </ListItem>
    </>
  );
};

export default ContactCard;
