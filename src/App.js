import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { Upload } from "./screens/Upload";
import HomeDesign from "./screens/HomeDesign";
import ProfileDesign from "./screens/ProfileDesign";
import { VideoDesign } from "./screens/VideoDesign";
import Premium from "./screens/Premium";
import { Browse } from "./screens/Browse";

function App() {
	return (
		<Router>
			<AppStyled>
				<div>
					<Routes>
						{/* <Route path="/" exact element={<Home />} /> */}
						<Route path="/upload" exact element={<Upload />} />
						{/* <Route path="/profile/:userAddress" exact element={<Profile />} /> */}
						{/* <Route path="/video/:videoId" exact element={<Video />} /> */}
						<Route path="/video/:videoId" exact element={<VideoDesign />} />
						{/*  */}
						<Route path="/" exact element={<HomeDesign />} />
						<Route
							path="/profile/:userAddress"
							exact
							element={<ProfileDesign />}
						/>
						<Route path="/browse" exact element={<Browse />} />
						<Route path="/Premium" exact element={<Premium />} />
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
