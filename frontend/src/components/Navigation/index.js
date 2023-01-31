// frontend/src/components/Navigation/index.js
// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<div className="nav-container">
			<div>
				<NavLink className="navs-font" exact to="/">
					Home
				</NavLink>
			</div>
			<div>
				<NavLink className="navs-font" exact to="/sub">
					Subreadits
				</NavLink>
			</div>
			{isLoaded && (
				<div>
					<ProfileButton className="navs-font" user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;
