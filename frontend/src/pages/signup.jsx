import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import Navbar from "../components/Navbar";
import { backendURI } from '../index';


const Signup = () => {
	const [data, setData] = useState({
		name: "",
		userName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
        if (input.value) {
		    setData({ ...data, [input.name]: input.value });
        } else{
	    	setData({ ...data, [input.name]: input.defaultValue });
        }
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${backendURI}/api/user/signup`;
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
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
		<div className="signup_container">
			<div className="signup_form_container">
				<div className="right-signup">
					<h1 style={{padding: "20px" }}>Existing User ?</h1>
					<Link to="/login">
						<button type="button" className="white_btn-signup">
							Sing in
						</button>
					</Link>
				</div>
				<div className="left-signup">
					<form className="form_container-signup" onSubmit={handleSubmit}>
						
						<input
							type="text"
							placeholder="Name"
							name="name"
							onChange={handleChange}
							// value={data.name}
							defaultValue={data.name}
							required
							className="input-signup"
						/>
						<input
							type="text"
							placeholder="Username"
							name="userName"
							onChange={handleChange}
                            defaultValue={data.userName}
							value={data.userName}
							required
							className="input-signup"
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							// value={data.email}
							defaultValue={data.email}
							required
							className="input-signup"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							// value={data.password}
							defaultValue={data.password}
							required
							className="input-signup"
						/>
						{error && <div className="error_msg-signup">{error}</div>}
						<button type="submit" className="green_btn-signup">
							Sing Up
						</button>
					</form>
				</div>
			</div>
		</div>
		</>
		
	);
};

export default Signup;