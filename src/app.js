import Router from "./router";
import { Box } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
function App() {
  console.log("object", process.env.REACT_APP_BACKEND_URL);

  return (
    <Box className="App">
      <BrowserRouter>
        <Router></Router>
      </BrowserRouter>
    </Box>
  );
}

export default App;
