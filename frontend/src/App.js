import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import SubreaditIndex from "./components/Subreadit/SubreaditIndex";
import SubreaditDetails from "./components/Subreadit/SubreaditDetails";
import PostDetails from "./components/Posts/PostDetails";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>

					<Route exact path="/sub">
						<SubreaditIndex />
					</Route>

					<Route path="/posts/:postId">
						<PostDetails />
					</Route>

					<Route path="/sub/:subId">
						<SubreaditDetails />
					</Route>

					<Route>
						<div>Error 404: Not Found.</div>
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
