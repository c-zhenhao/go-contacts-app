import React from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

const View = () => {
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    console.log("delete clicked");
    if (window.confirm("are you sure you want to delete?")) {
      // call API to delete
      console.log("delete api called");
    }
    navigate("/");
  };

  return (
    <>
      <Container>
        <Box mt={2}>
          <Typography>This is View page</Typography>
        </Box>

        <Grid container sx={{ display: "flex" }} spacing={1}>
          <Grid item xs={0.5}>
            <IconButton component={RouterLink} to={"/"}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>

          <Grid item xs={3} sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar sx={{ width: 150, height: 150 }} />
          </Grid>

          <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5">HELLO MY NAME IS REALLY LONG</Typography>
          </Grid>

          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{ minWidth: "110px" }}
              startIcon={<ModeEditIcon />}
              component={RouterLink}
              to={"/edit"}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 1, minWidth: "110px" }}
              startIcon={<DeleteIcon />}
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 3, mb: 3 }} />

        <Box>
          <Grid container>
            <Grid item xs={7}>
              <Paper
                elevation={0}
                sx={{
                  minHeight: "100px",
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: "14px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Contact Details
                </Typography>

                <Box sx={{ mt: 1 }}>
                  <Box sx={{ mt: 1, display: "flex" }}>
                    <LocalPhoneOutlinedIcon
                      fontSize="small"
                      sx={{ color: "#909092", mr: 2 }}
                    />
                    <Typography>12345678</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default View;
