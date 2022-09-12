import React from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Grid, ListItem, IconButton } from "@mui/material";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

const ContactCard = (props) => {
  // console.log(props);
  const navigate = useNavigate();

  const deleteData = async () => {
    const url = `http://localhost:8000/contact/${props.id}`;
    const config = {
      method: "DELETE",
    };

    const abortController = new AbortController();
    const signal = abortController.signal;

    try {
      const response = await fetch(url, config, { signal });

      if (response.status !== 200) {
        throw new Error("couldn't delete data");
      }
      const data = await response.json();
      console.log(data.data);

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ListItem
        button
        onClick={() => {
          navigate(`/view/${props?.id}`);
        }}
      >
        <Grid
          container
          direction="row"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid item xs={1} sx={{ ml: 1 }}>
            <Avatar
              src={`https://ui-avatars.com/api/?name=${props?.name[0]}&length=1&background=random&size=150`}
            />
          </Grid>
          <Grid item xs={5}>
            {props?.name}
          </Grid>
          <Grid item xs={4}>
            {props?.phone}
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
                navigate(`/edit/${props?.id}`);
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
                if (window.confirm("are you sure you want to delete?")) {
                  console.log("delete api called");
                  deleteData();
                }
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
