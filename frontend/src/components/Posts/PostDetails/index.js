// subreadit index

//imports
import React, { useEffect, useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkReadPostDetails } from "../../../store/posts";

//main
const PostDetails = () => {
	let dispatch = useDispatch();
	let [isLoaded, setIsLoaded] = useState(false);
	let { postId } = useParams();

	useEffect(() => {
		let payload = { postId };
		dispatch(thunkReadPostDetails(payload))
			.then(() => setIsLoaded(true))
			.catch((e) => e.errors);
	}, [dispatch]);

	let posts = useSelector((state) => state.posts);

	let post = posts[postId];

	if (isLoaded) {
		let {
			createdAt,
			id,
			linkUrl,
			picUrl,
			subId,
			text,
			title,
			userId,
			CommentCount,
			Subreadit,
			User,
		} = post;

		//dates
		let date = new Date(createdAt).toString().split(" ");
		let month = date[1];
		let day = date[2];
		let year = date[3];

		//return
		return (
			<div>
				<div className="details-font">Post Details</div>

				<div className="post-container">
					<h4>{title}</h4>
					<div>{`Post: ${text}`}</div>
					{linkUrl ? (
						<a
							href={linkUrl}
							target="_blank"
						>{`Link: ${linkUrl}`}</a>
					) : null}
					<div className="spacing">{`By: ${User.username}`}</div>
					<div className="spacing">{`Posted ${month} ${day}, ${year}`}</div>
					<div className="spacing">{`${CommentCount} Comments`}</div>
					<div className="spacing">{`From ${Subreadit.name}`}</div>
				</div>
				<div className="post-container">Comments:</div>
			</div>
		);
	} else return null;
};

export default PostDetails;

/*

{
createdAt,
id,
linkUrl,
picUrl,
subId,
text,
title,
userId,
CommentCount,
Subreadit{id, name},
User{id, username},
}





*/
