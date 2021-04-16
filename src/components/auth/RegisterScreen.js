import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

export const RegisterScreen = () => {
	const dispatch = useDispatch();
	const { msgError } = useSelector((state) => state.ui);

	const [formValues, handleInputChange] = useForm({
		name: "",
		email: "",
		password: "",
		password2: "",
	});

	const { name, email, password, password2 } = formValues;

	const handleRegister = (e) => {
		e.preventDefault();
		if (isFormValid()) {
			dispatch(startRegisterWithEmailPasswordName(email, password, name));
		}
	};
	const isFormValid = () => {
		if (name.trim().length === 0) {
			dispatch(setError("Name is required"));
			return false;
		}
		if (!validator.isEmail(email)) {
			dispatch(setError("Email is not valid"));
			return false;
		}
		if (password.trim().length === 0) {
			dispatch(setError("Password is required"));
			return false;
		}
		if (password.trim().length < 5) {
			dispatch(setError("Password should be at least 5 characters"));
			return false;
		}
		if (password.trim() !== password2.trim()) {
			dispatch(setError("The password should match with each other"));
			return false;
		}
		dispatch(removeError());
		return true;
	};

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<h3 className="auth__tittle">Register</h3>
			<form onSubmit={handleRegister}>
				<input
					className="auth__input"
					type="text"
					placeholder="Name"
					name="name"
					value={name}
					autoComplete="off"
					onChange={handleInputChange}
				/>
				<input
					className="auth__input"
					type="text"
					placeholder="Email"
					name="email"
					value={email}
					autoComplete="off"
					onChange={handleInputChange}
				/>
				<input
					className="auth__input"
					type="password"
					placeholder="Password"
					name="password"
					value={password}
					onChange={handleInputChange}
				/>
				<input
					className="auth__input"
					type="password"
					placeholder="Confirm password"
					name="password2"
					value={password2}
					onChange={handleInputChange}
				/>
				{msgError && (
					<div className="auth__alert-error animate__animated animate__fadeIn animate__faster">
						{msgError}
					</div>
				)}
				<button
					className="btn btn-primary btn-block mb-5"
					type="submit"
				>
					Register
				</button>
				<Link className="link" to="/auth/login">
					Already registered?
				</Link>
			</form>
		</div>
	);
};
