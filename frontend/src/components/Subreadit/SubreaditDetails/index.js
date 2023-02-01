// subreadit index

//imports
import React, { useEffect, useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import {
	thunkReadSubreaditDetails,
	thunkReadSubreadits,
} from "../../../store/subreadits";
import { thunkReadPosts } from "../../../store/posts";
import ReadSubreadit from "../ReadSubreadit";
import ReadPost from "../../Posts/ReadPost";
import "../../../index.css";

//main
const SubreaditDetails = () => {
	let dispatch = useDispatch();
	let [isLoaded, setIsLoaded] = useState(false);
	let { subId } = useParams();

	useEffect(() => {
		let payload = { subId };
		dispatch(thunkReadSubreaditDetails(payload))
			.then(() => dispatch(thunkReadPosts(payload)))
			.then(() => setIsLoaded(true))
			.catch((e) => e.errors);
	}, [dispatch]);

	let subs = useSelector((state) => state.subreadits);
	let allPosts = useSelector((state) => state.posts);
	let posts = Object.values(allPosts);

	let sub = subs[subId];

	if (isLoaded) {
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

		let mods = Object.values(Mods);

		//return
		return (
			<>
				<div className="details-font">Subreadit Details</div>
				<div className="posts-div">Posts:</div>
				<div className="super-container">
					<div className="sub-margin-container">
						<div className="left-sub-container">
							{posts.map((post) => (
								<NavLink
									className="posts-links"
									key={post.id}
									to={`/posts/${post.id}`}
								>
									<ReadPost post={post} />
								</NavLink>
							))}
						</div>

						<div className="subs-container description">
							<h2>{name}</h2>
							<div>About:</div>
							<div style={{ textAlign: "center" }}>{about}</div>
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
					</div>
				</div>
			</>
		);
	} else return null;
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


{
CommentCount,
Subreadit,
User {id, username},
id,
linkUrl,
picUrl,
text,
title
}





*/
