import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { Home } from "./screens/Home";
import { Upload } from "./screens/Upload";
import Profile from "./screens/Profile";

function App() {
  return (
    <Router>
      <AppStyled>
        <div>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/upload" exact element={<Upload />} />
            <Route path="/profile" exact element={<Profile />} />
          </Routes>
        </div>
      </AppStyled>
    </Router>
  );
}

export default App;

const AppStyled = styled.div`
  //   display: flex;
  //   justify-content: space-between;
  //   padding: 40px 12px;
  //   position: relative;
  //   width: 100%;
  //   max-width: 1240px;
  padding: 0 5vw;
`;
