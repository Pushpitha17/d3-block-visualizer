import React from "react";
import AppBar from "../Components/AppBar";
import { Container, Box } from "@mui/material";
import Slider from "../Components/Slider";
import AnimationArea from "../Components/AnimationArea";

function Index() {

  return (
    <>
      <AppBar />
      <Container sx={{
        display: 'flex',
        height: "calc(100vh - 180px)",
        flexDirection: 'column'
      }}>
        <Box sx={{
          flex: 1, 
          py: '20px', 
          width: '80%',
          margin : '0 auto'
        }}>
          <AnimationArea />
        </Box>
        <Box sx={{
          height: "50px"
        }}>
          <Slider />
        </Box>
      </Container>
    </>
  );
}

export default Index;
