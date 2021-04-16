import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { firebase } from "../firebase/firebaseConfig.js";
import { login } from "../actions/auth";

import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { PublicRoute } from "./PublicRoute.js";
import { PrivateRoute } from "./PrivateRoute.js";
import { startLoadingNotes } from "../actions/notes.js";

export const AppRouter = () => {
	const dispatch = useDispatch();
	const [checking, setChecking] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user?.uid) {
				dispatch(login(user.uid, user.displayName));
				setIsLoggedIn(true);
				dispatch(startLoadingNotes(user.uid));
			} else {
				setIsLoggedIn(false);
			}
			setChecking(false);
		});
	}, [dispatch, setChecking, setIsLoggedIn]);

	if (checking) {
		return <h1>Wait a moment...</h1>;
	}

	return (
		<Router>
			<div>
				<Switch>
					<PublicRoute
						path="./auth"
						component={AuthRouter}
						isLoggedIn={isLoggedIn}
					/>
					<PrivateRoute
						path="./"
						exact
						component={JournalScreen}
						isLoggedIn={isLoggedIn}
					/>
					<Redirect to="./auth/login" />
				</Switch>
			</div>
		</Router>
	);
};
