import React  from "react";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Index from "./Pages";

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            {/* <Route exact path='/' element={<Form  pageParams={params} />}/> */}
            <Route exact path='/' element={<Index  />}/>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
