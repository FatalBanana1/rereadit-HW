// subreadit index

//imports
import React, { useEffect, useState } from "react";
// import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink} from "react-router-dom";
import {
	// actionResetSubreadits,
	thunkReadSubreadits,
} from "../../../store/subreadits";
import ReadSubreadit from "../ReadSubreadit";
// import { actionResetPosts } from "../../../store/posts";

//main
const SubreaditIndex = () => {
	let dispatch = useDispatch();
	let [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(thunkReadSubreadits())
			.then(() => setIsLoaded(true))
			.catch((e) => e.errors);
	}, [dispatch]);

	let subs = useSelector((state) => state.subreadits);
	let subreadits = Object.values(subs);

	//return
	return (
		<div>
			<div className="details-font">Subreadit Index</div>
			<div className="posts-div">Subreadits:</div>
			{isLoaded && (
				<div className="subs-container">
					{subreadits.map((sub) => (
						<NavLink
							className="sub-links"
							key={sub.id}
							to={`/sub/${sub.id}`}
						>
							<ReadSubreadit sub={sub} />
						</NavLink>
					))}
				</div>
			)}
		</div>
	);
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
