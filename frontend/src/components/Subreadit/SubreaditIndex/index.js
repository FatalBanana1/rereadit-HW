// subreadit index

//imports
import React, { useEffect, useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { thunkReadSubreadits } from "../../../store/subreadits";
import ReadSubreadit from "../ReadSubreadit";

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
	console.log(`SUBS ======`, subs);

	let subreadits = Object.values(subs);

	//return
	return (
		<div>
			<div>Connected to Subreadit Index Component!!!</div>
			{isLoaded && (
				<div className="subs-container">
					{subreadits.map((sub) => (
						<NavLink to={`/sub/${sub.id}`}>
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
