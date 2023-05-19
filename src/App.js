import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { Home } from "./screens/Home";
import { Upload } from "./screens/Upload";
import { Video } from "./screens/Video";
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
						<Route path="/video/:videoId" exact element={<Video />} />
					</Routes>
				</div>
			</AppStyled>
		</Router>
	);
}

export default App;

const AppStyled = styled.div`
	padding: 0 5vw;
`;
