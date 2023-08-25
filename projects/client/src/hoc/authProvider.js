import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../components/Loading";
import { api } from '../api/api';

export default function AuthProvider({ children }) {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch();
	}, []);

	async function fetch() {
		try {
			const token = JSON.parse(localStorage.getItem("auth"));
			const user = await api()
				.get(`${process.env.REACT_APP_API_BASE_URL}/authentication/v2`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => res.data);
			if (user) {
				dispatch({
					type: "login",
					payload: user,
				});
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	}
	return <>{isLoading ? <Loading /> : children}</>;
}
