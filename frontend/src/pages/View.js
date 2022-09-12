import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";

import LoadingSpinner from "../components/LoadingSpinner";

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
  const params = useParams();

  console.log(params.contactId);

  const [contact, setContact] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (url, config, signal) => {
    setIsLoading(true);

    try {
      const response = await fetch(url, config, { signal });

      if (response.status !== 200) {
        throw new Error("couldn't fetch data");
      }
      const data = await response.json();
      console.log(data.data);
      console.log(data.data.data);

      setContact(data.data.data);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  // fetch data on component render
  useEffect(() => {
    console.log(`view.js mounted or rendered`);

    const url = `http://localhost:8000/contact/${params.contactId}`;
    const config = {
      method: "GET",
    };

    const abortController = new AbortController();
    const signal = abortController.signal;

    fetchData(url, config, signal);

    return () => {
      abortController.abort();
    };
  }, []);

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
      <Container maxWidth="xl">
        <Box mt={3} mb={2}>
          <Typography variant="h5" fontWeight="bold">
            View Contact
          </Typography>
        </Box>

        {isLoading ? (
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <LoadingSpinner />
          </Container>
        ) : (
          <>
            <Grid container sx={{ display: "flex" }} spacing={1}>
              <Grid item xs={0.5}>
                <IconButton component={RouterLink} to={"/"}>
                  <ArrowBackIcon />
                </IconButton>
              </Grid>

              <Grid
                item
                xs={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Avatar sx={{ width: 150, height: 150 }} />
              </Grid>

              <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5">{contact?.name}</Typography>
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
                  to={`/edit/${params.contactId}`}
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
                    <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                      Contact Details
                    </Typography>

                    <Box sx={{ mt: 1 }}>
                      <Box sx={{ mt: 1, display: "flex" }}>
                        <LocalPhoneOutlinedIcon
                          fontSize="small"
                          sx={{ color: "#909092", mr: 2 }}
                        />
                        <Typography>{contact?.phone}</Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default View;
