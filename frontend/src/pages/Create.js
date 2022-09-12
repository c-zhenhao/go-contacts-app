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
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const Create = () => {
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    console.log("delete clicked");
    if (window.confirm("are you sure you want to delete?")) {
      // call API to delete
      console.log("delete api called");
      navigate("/");
    }
  };

  return (
    <>
      <Container>
        <Box mt={2}>
          <Typography>This is create contact page</Typography>
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
            <Typography variant="h5"></Typography>
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
              color="primary"
              sx={{ minWidth: "110px" }}
              startIcon={<ModeEditIcon />}
              component={RouterLink}
              to={"/"}
              disabled={true}
            >
              Save
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
                <Typography sx={{ fontWeight: "bold", mb: 0 }}>
                  Contact Details
                </Typography>

                <Box sx={{ mt: 1 }}>
                  <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
                    <PersonOutlineOutlinedIcon
                      fontSize="small"
                      sx={{ color: "#909092", mr: 2 }}
                    />
                    <TextField
                      id="name"
                      label="Name"
                      variant="standard"
                      margin="dense"
                      fullWidth
                      sx={{ mr: 4, fontColor: "#909092" }}
                    />
                  </Box>
                  <Box sx={{ mt: 3, display: "flex" }}>
                    <LocalPhoneOutlinedIcon
                      fontSize="small"
                      sx={{ color: "#909092", mr: 2 }}
                    />
                    <TextField
                      id="phone"
                      label="Phone Number"
                      variant="standard"
                      size="small"
                      fullWidth
                      sx={{ mr: 4 }}
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    />
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

export default Create;
