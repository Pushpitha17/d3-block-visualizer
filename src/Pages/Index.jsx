import React from "react";
import AppBar from "../Components/AppBar";
import { Container } from "@mui/material";
import Documents from "../Components/Documents";
import Slider from "../Components/Slider";
// import D3Slider from "../Components/D3Slider";
// import NewSlider from "../Components/NewSlider";

function Index() {

  return (
    <>
      <AppBar />
      <Container>
        <Documents></Documents>
        <Slider></Slider>
        {/* <NewSlider></NewSlider> */}
      </Container>
    </>
  );
}

export default Index;
