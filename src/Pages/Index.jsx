import React from "react";
import AppBar from "../Components/AppBar";
import { Container } from "@mui/material";
import Documents from "../Components/Documents";
import Slider from "../Components/Slider";

function Index() {

  return (
    <>
      <AppBar />
      <Container>
        <Documents></Documents>
        <Slider></Slider>
      </Container>
    </>
  );
}

export default Index;
