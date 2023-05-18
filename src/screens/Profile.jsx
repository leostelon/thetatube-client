import React from "react";
import { Navbar } from "../components/Navbar";
import { Avatar, Box, Button, Divider, Grid } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

export default function Profile() {
  return (
    <>
      <Navbar />
      <Box sx={{ pl: 4 }}>
        <Grid container sx={{ color: "white" }}>
          <Grid iteam>
            <Avatar
              //   sx={{ bgcolor: deepOrange[500] }}
              alt="Remy Sharp"
              src="/broken-image.jpg"
              sx={{
                height: "128px",
                width: "128px",
                mr: 3,
              }}
            >
              B
            </Avatar>
          </Grid>
          <Grid
            iteam
            sx={{ pb: 2 }}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box sx={{ fontSize: 24 }}>hari prasana</Box>
            <Box sx={{ mt: 1, fontSize: 14 }}>
              @hariprasana1234r5 No subscribers No videos
            </Box>
          </Grid>
        </Grid>
        {/* secondry nav */}
        <>
          <Grid container spacing={2} sx={{ mt: 3, ml: 2 }}>
            <Grid iteam xs={2} md={1} sx={{}}>
              <Button sx={{ color: "gray" }}>Home</Button>
            </Grid>
            {/* <Grid iteam xs={2} md={1} sx={{}}>
              <Button>Home</Button>
            </Grid> */}
          </Grid>
        </>
        <hr style={{ backgroundColor: "gray" }} />
      </Box>
    </>
  );
}
