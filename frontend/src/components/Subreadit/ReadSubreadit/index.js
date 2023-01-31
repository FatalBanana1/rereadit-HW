// subreadit index

//imports
import React, { useEffect, useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

//main
const ReadSubreadit = ({ sub }) => {
	let {
		Admin,
		SubscriberCount,
		about,
		adminId,
		bannerImage,
		category,
		circleImage,
		id,
		name,
	} = sub;

	//return
	return (
		<div className="readsub-container">
			<div>{`${name}`}</div>
			<div>{`About: ${about}`}</div>
			<div>{`Created by: ${Admin.username}`}</div>
			<div>{`${SubscriberCount} Subscribers`}</div>
		</div>
	);
};

export default ReadSubreadit;

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
