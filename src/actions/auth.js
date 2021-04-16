import Swal from "sweetalert2";
import { firebase, googleAuthProvider } from "../firebase/firebaseConfig.js";
import { types } from "../types/types";
import { notesLogout } from "./notes.js";
import { uiFinishLoading, uiStartLoading } from "./ui.js";

export const startLoginEmailPassword = (email, password) => {
	return (dispatch) => {
		dispatch(uiStartLoading());
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName));
				dispatch(uiFinishLoading());
			})
			.catch((e) => {
				dispatch(uiFinishLoading());
				Swal.fire("Error", e.message, "error");
			});
	};
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
	return (dispatch) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async ({ user }) => {
				await user.updateProfile({ displayName: name });
				dispatch(login(user.uid, user.displayName));
			})
			.catch((e) => {
				Swal.fire("Error", e.message, "error");
			});
	};
};

export const startGoogleLogin = () => {
	return (dispatch) => {
		firebase
			.auth()
			.signInWithPopup(googleAuthProvider)
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName));
			});
	};
};

export const login = (uid, displayName) => ({
	type: types.login,
	payload: {
		uid,
		displayName,
	},
});

export const startLogOut = () => {
	return async (dispatch) => {
		await firebase.auth().signOut();
		dispatch(logout());
		dispatch(notesLogout());
	};
};

export const logout = () => ({
	type: types.logout,
});
