import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppNavigation from "./routes";

function App() {
  return (
    <>
      <ToastContainer />
      <AppNavigation />
    </>
  );
}

export default App;
