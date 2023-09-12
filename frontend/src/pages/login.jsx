import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./login.css";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";
import { backendURI } from '../index';


const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const { dispatch } = useAuthContext();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${backendURI}/api/user/login`;
			const res = await axios.post(url, data);
            const newToken = res.data["token"];
            const existingToken = localStorage.getItem("token");
            if (existingToken) {
                localStorage.removeItem("token");
				localStorage.removeItem("email");
            	localStorage.removeItem("userName");
            	localStorage.removeItem("name");
            	localStorage.removeItem("admin");
            }

            localStorage.setItem("token", newToken);
            localStorage.setItem("email", res.data["email"]);
            localStorage.setItem("userName", res.data["userName"]);
            localStorage.setItem("name", res.data["name"]);
            localStorage.setItem("admin", res.data["admin"]);
			// localStorage.setItem("token", res.data["token"]);
            // console.log(res.data, res.data["token"])
			dispatch({type:"LOGIN", payload: res.data})
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
		<>
		<Navbar/>
		<div className="login_container">
			<div className="login_form_container">
				<div className="left-login">
					<form className="form_container-login" onSubmit={handleSubmit}>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="input-login"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="input-login"
						/>
						{error && <div className="error_msg-login">{error}</div>}
						<button type="submit" className="green_btn-login">
							Log In
						</button>
					</form>
				</div>
				<div className="right-login">
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className="white_btn-login">
							Sing Up
						</button>
					</Link>
				</div>
			</div>
		</div>
		</>
		
	);
};

export default Login;