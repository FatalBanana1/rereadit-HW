// subreadit index

//imports
import React, { useEffect, useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkReadPostDetails } from "../../../store/posts";
import { thunkReadComments } from "../../../store/comments";
import ReadComment from "../../Comments/ReadComment";

//main
const PostDetails = () => {
	let dispatch = useDispatch();
	let [isLoaded, setIsLoaded] = useState(false);
	let { postId } = useParams();

	useEffect(() => {
		let payload = { postId };
		dispatch(thunkReadPostDetails(payload))
			.then(() => dispatch(thunkReadComments(payload)))
			.then(() => setIsLoaded(true))
			.catch((e) => e.errors);
	}, [dispatch]);

	let posts = useSelector((state) => state.posts);
	let allComments = useSelector((state) => state.comments);
	let comments = Object.values(allComments);
	let post = posts[postId];

	let parents = comments.filter((el) => el.parentId === null);
	let children = comments.filter((el) => el.parentId != null);

	console.log(`Inside comments comp =====`, comments);
	console.log(`Inside PAR =====`, parents);
	console.log(`Inside Child =====`, children);

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
				<div className="post-container">
					{parents.map((comment, i) => {
						if (i === parents.length - 1) {
							// setParentsLoaded(true)
						}
						return (
							<ReadComment key={comment.id} comment={comment} />
						);
					})}
					{children.map((comment) => (
						<ReadComment key={comment.id} comment={comment} />
					))}
				</div>
			</div>
		);
	} else return null;
};

export default PostDetails;

/*

posts:

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

comments:

{
PostComments {id, subId, userId},
User {id, username},
childComments,
createdAt,
id,
parentId,
postId,
text,
}



*/
