import './App.css';
import { BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
		<Router>
			<Routes>
				{/* <Route path="/" exact element={<Home />} />
				<Route path="/explore" exact element={<Explore />} />
				<Route path="/profile/:user" exact element={<Profile />} /> */}
			</Routes>
		</Router>
	);
}

export default App;
