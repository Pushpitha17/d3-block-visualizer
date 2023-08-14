import React, { useState } from "react";
import AppBar from "../Components/AppBar";
import { Container } from "@mui/material";
import Documents from "../Components/Documents";
import Slider from "../Components/Slider";
import { AppContext } from "../Context/AppContext";

function Index() {
  const [sliderValue, setSliderValue] = useState(10);

  return (
    <>
      <AppBar />
      <Container>
        <AppContext.Provider value={{ sliderValue, setSliderValue }}>
          <Documents></Documents>
          <Slider></Slider>
        </AppContext.Provider>
      </Container>
    </>
  );
}

export default Index;
