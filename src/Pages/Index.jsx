import React from "react";
import AppBar from "../Components/AppBar";
import { Container, Box } from "@mui/material";
import Slider from "../Components/Slider";
import AnimationArea from "../Components/AnimationArea";
import { useSelector } from "react-redux";

function Index() {

  const width = useSelector((state) => state.svg.width);


  return (
    <>
      <AppBar />
      <Container
        sx={{
          display: 'flex',
          height: "calc(100vh - 180px)",
          flexDirection: 'column',
          margin: '0 auto',
          alignItems: 'center', 
          minWidth: `${width + 200}px`,
          minHeight: '560px'
        }}
        maxWidth='xl'
        
>
        <Box sx={{
          flex: 1,
          py: '20px',
          width: `${width}px`,
          margin: '0 20px',
        }}
        >
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
