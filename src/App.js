import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { Home } from "./screens/Home";
import { Upload } from "./screens/Upload";
import { Video } from "./screens/Video";
import Profile from "./screens/Profile";
import HomeDesign from "./screens/HomeDesign";
import ProfileDesign from "./screens/ProfileDesign";
import { VideoDesign } from "./screens/VideoDesign";

function App() {
	return (
		<Router>
			<AppStyled>
				<div>
					<Routes>
						{/* <Route path="/" exact element={<Home />} /> */}
						<Route path="/upload" exact element={<Upload />} />
						<Route path="/profile/:userAddress" exact element={<Profile />} />
						<Route path="/video/:videoId" exact element={<Video />} />
						<Route path="/video" exact element={<VideoDesign />} />
						{/*  */}
						<Route path="/" exact element={<HomeDesign />} />
						<Route path="/profile" exact element={<ProfileDesign />} />
					</Routes>
				</div>
			</AppStyled>
		</Router>
	);
}

export default App;

const AppStyled = styled.div`
	/* padding: 0 5vw; */
`;
