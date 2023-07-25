import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes } from "react-router-dom";
import routes from "./routes/Routes";
import Loading from "./components/Loading";

function App() {
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/greetings`
			);
			setMessage(data?.message || "");
		})();
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, [isLoading]);
	
	return (
		<>
			{isLoading ? (
        		<Loading />
     		) : (
        		<Routes>{routes.map((val) => val)}</Routes>
      		)}
		</>
	);
}

export default App;
