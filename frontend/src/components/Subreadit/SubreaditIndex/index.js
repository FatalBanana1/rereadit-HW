// subreadit index

//imports
import React, { useEffect, useState } from "react";
// import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import {
	actionResetSubreadits,
	thunkCreateSubreadit,
	// actionResetSubreadits,
	thunkReadSubreadits,
} from "../../../store/subreadits";
import ReadSubreadit from "../ReadSubreadit";
// import { actionResetPosts } from "../../../store/posts";

//main
const SubreaditIndex = () => {
	let dispatch = useDispatch();
	const history = useHistory();
	let [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(thunkReadSubreadits())
			.then(() => setIsLoaded(true))
			.catch((e) => e.errors);
		return () => dispatch(actionResetSubreadits());
	}, [dispatch]);

	let subs = useSelector((state) => state.subreadits);
	let subreadits = Object.values(subs);

	//-------------------------------------
	//handlers

	const handleCreateSubreadit = () => {
		//return
		let payload = {
			adminId: 1,
			name: "Sequelize",
			about: "The most awesome ORM for JavaScript language. Posting tips and suggestions for working with this ORM.",
			category: "Technology",
			// bannerImage,
			// circleImage,
		};
		dispatch(thunkCreateSubreadit(payload))
			.then((data) => history.push(`/sub/${data.id}`))
			.catch((e) => e.errors);
	};

	//-------------------------------------

	if (isLoaded && subreadits) {
		//-------------------------------------

		//return
		return (
			<div>
				<div className="details-font">Subreadit Index</div>
				<div className="row spacebetween">
					<div className="posts-div">Subreadits:</div>
					<div className="posts-div pointer" onClick={handleCreateSubreadit}>
						Create Subreadit
					</div>
				</div>

				<div className="subs-container">
					{subreadits && subreadits.length
						? subreadits.map((sub) => (
								<NavLink
									className="sub-links"
									key={sub.id}
									to={`/sub/${sub.id}`}
								>
									<ReadSubreadit sub={sub} />
								</NavLink>
						  ))
						: null}
				</div>
			</div>
		);
	} else return null;
};

export default SubreaditIndex;

/*

{
Admin {id, username}
SubscriberCount,
about,
adminId,
bannerImage,
category,
circleImage,
id,
name,
}


*/
