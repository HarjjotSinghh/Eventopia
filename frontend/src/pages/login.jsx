import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./login.css";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/api/user/login";
			const res = await axios.post(url, data);
            const newToken = res.data["token"];
            const existingToken = localStorage.getItem("token");
            if (existingToken) {
                localStorage.removeItem("token");
				localStorage.removeItem("email");
            	localStorage.removeItem("userName");
            	localStorage.removeItem("name");
            }

            localStorage.setItem("token", newToken);
            localStorage.setItem("email", res.data["email"]);
            localStorage.setItem("userName", res.data["userName"]);
            localStorage.setItem("name", res.data["name"]);
			// localStorage.setItem("token", res.data["token"]);
            // console.log(res.data, res.data["token"])
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className="login_container">
			<div className="login_form_container">
				<div className="left">
					<form className="form_container" onSubmit={handleSubmit}>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="input"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="input"
						/>
						{error && <div className="error_msg">{error}</div>}
						<button type="submit" className="green_btn">
							Log In
						</button>
					</form>
				</div>
				<div className="right">
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className="white_btn">
							Sing Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;