// subreadit index

//imports
import React, { useEffect, useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { thunkReadSubreaditDetails } from "../../../store/subreadits";
import ReadSubreadit from "../ReadSubreadit";

//main
const SubreaditDetails = () => {
	let dispatch = useDispatch();
	let [isLoaded, setIsLoaded] = useState(false);
	let { subId } = useParams();

	useEffect(() => {
		let payload = { subId };
		dispatch(thunkReadSubreaditDetails(payload))
			.then(() => setIsLoaded(true))
			.catch((e) => e.errors);
	}, [dispatch]);

	let sub = useSelector((state) => state.subreadits);

	let {
		Admin,
		SubscriberCount,
		Subscribers,
		Mods,
		about,
		adminId,
		bannerImage,
		category,
		circleImage,
		id,
		name,
	} = sub;

	if (!id) return null;
	let mods = Object.values(Mods);

	//return
	return (
		<div>
			<div>Subreadit Details</div>
			{isLoaded && (
				<div className="subs-container">
					<div>{name}</div>
					<div>{`About: ${about}`}</div>

					<ul>
						Mods:
						{mods.length
							? mods.map((el) => (
									<li key={el.id}>{el.username}</li>
							  ))
							: null}
					</ul>
					<div>{`Created by: ${Admin.username}`}</div>
					<div>{`${SubscriberCount} Subscribers`}</div>
				</div>
			)}
		</div>
	);
};

export default SubreaditDetails;

/*

{
Admin {id, username, email}
SubscriberCount,
Subscribers { 1: { id, email, username }, 2: { id...} },
Mods { 1: { id, email, username }, 2: { id...} },
about,
adminId,
bannerImage,
category,
circleImage,
id,
name,
}




*/
