import React, { useState } from "react";

import ContactCard from "../components/ContactCard";

import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Pagination,
  Typography,
} from "@mui/material";

const Home = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    console.log(value);
    console.log("pagination clicked");
    setPage(value);
  };

  return (
    <>
      <Container>
        <Box mt={2}>
          <Typography>This is home page</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Typography>Page no: {page}</Typography>
          <Pagination
            count={10}
            size="large"
            color="primary"
            page={page}
            onChange={handlePageChange}
          />
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Grid container>
          <Grid container>
            <Grid item xs={12}>
              <Card>
                <List component="div">
                  <ListItem>
                    <Grid container>
                      <Grid item xs={1} sx={{ ml: 1 }}>
                        <Typography fontWeight="bold">Name</Typography>
                      </Grid>
                      <Grid item xs={5}></Grid>
                      <Grid item xs={4}>
                        <Typography fontWeight="bold">Phone Number</Typography>
                      </Grid>
                      <Grid item xs={1}></Grid>
                    </Grid>
                  </ListItem>

                  <Divider />

                  <ContactCard />
                </List>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
