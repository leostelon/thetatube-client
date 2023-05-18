import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home";
import { Upload } from "./screens/Upload";
import Profile from "./screens/Profile";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/upload" exact element={<Upload />} />
				<Route path="/profile" exact element={<Profile />} />
			</Routes>
		</Router>
	);
}

export default App;
