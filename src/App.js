import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home";
import { Upload } from "./screens/Upload";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/upload" exact element={<Upload />} />
			</Routes>
		</Router>
	);
}

export default App;
