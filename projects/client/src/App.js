import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes } from "react-router-dom";
import routes from "./routes/Routes";

function App() {
	const [message, setMessage] = useState("");

	useEffect(() => {
		(async () => {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/greetings`
			);
			setMessage(data?.message || "");
		})();
	}, []);
	return (
		<>
			<Routes>{routes.map((val) => val)}</Routes>
		</>
	);
}

export default App;
