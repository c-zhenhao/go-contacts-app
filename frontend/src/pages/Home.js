import React, { useEffect, useState } from "react";

import ContactCard from "../components/ContactCard";
import LoadingSpinner from "../components/LoadingSpinner";

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

const Home = (props) => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    console.log("pagination clicked. page:", value);
    setPage(value);
  };

  const fetchData = async (url, config, signal) => {
    setIsLoading(true);
    // setError(null);

    try {
      const response = await fetch(url, config, { signal });

      if (response.status !== 200) {
        throw new Error("couldn't fetch data");
      }

      const data = await response.json();
      console.log(data.data);
      console.log(data.data.data);

      setTotalPages(data.data.totalPages);
      setContacts(data.data.data);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  // fetch data on component render
  useEffect(() => {
    console.log(`home.js mounted or rendered`);

    let url = `http://localhost:8000/contact?sort=asc&limit=10&page=${page}&search=${props.search}`;
    const config = {
      method: "GET",
    };
    const controller = new AbortController();

    fetchData(url, config, controller.signal);

    // clean up function
    return () => {
      console.log(`home.js > running cleanup function`);
      controller.abort();
    };
  }, [page]);

  return (
    <>
      <Container maxWidth="xl">
        <Box mt={3}>
          <Typography></Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Typography>Page no: {page}</Typography>
          <Pagination
            count={totalPages}
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

                  <Divider sx={{ mb: 2 }} />

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
                    contacts !== null &&
                    contacts.map((contact) => {
                      return (
                        <ContactCard
                          key={contact.id}
                          id={contact.id}
                          name={contact.name}
                          phone={contact.phone}
                        />
                      );
                    })
                  )}
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
