// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password }))
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	const demoSignin1 = (e) => {
		e.preventDefault();
		let credential = "captain";
		let password = "password";
		return dispatch(sessionActions.login({ credential, password }))
			.then(closeModal)
			.then(() => history.push("/"));
	};

	const demoSignin2 = (e) => {
		e.preventDefault();
		let credential = "solo";
		let password = "password2";
		return dispatch(sessionActions.login({ credential, password }))
			.then(closeModal)
			.then(() => history.push("/"));
	};

	const demoSignin3 = (e) => {
		e.preventDefault();
		let credential = "bond007";
		let password = "password3";
		return dispatch(sessionActions.login({ credential, password }))
			.then(closeModal)
			.then(() => history.push("/"));
	};

	return (
		<>
			<h1>Log In</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Username or Email
					<input
						type="text"
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Log In</button>
			</form>

			<div className="users">
				<button onClick={demoSignin1}>Demo User (Sparrow)</button>
			</div>

			<div className="users">
				<button onClick={demoSignin2}>Demo User (Solo)</button>
			</div>

			<div className="users">
				<button onClick={demoSignin3}>Demo User (Bond)</button>
			</div>
		</>
	);
}

export default LoginFormModal;
