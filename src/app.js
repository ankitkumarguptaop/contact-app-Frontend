
import Router from './router';
import { Box } from '@mui/material';
import { BrowserRouter} from "react-router-dom";
function App() {
  return (
    <Box className="App">
       <BrowserRouter>
       <Router></Router>
    </BrowserRouter>
    </Box>
  );
}

export default App;
