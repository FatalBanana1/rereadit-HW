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

	if (isLoaded) {
		function dfs(el) {
			let mapper = [];
			let stack = [el];
			while (stack) {
				let curr = stack.pop();
				if (curr) {
					mapper.push(curr);
				}
				if (!curr || !curr.childComments) return mapper;
				if (curr.childComments[0])
					stack.push(allComments[curr.childComments[0].id]);
			}
			return mapper;
		}

		// list of children,
		// reverse array
		// start nesting with for loop
		// function nesting(list) {
		// 	if (list.length <= 1) return list;
		// 	list[list.length - 2]["next"] = list[list.length - 1];

		// 	return nesting(el, list.splice(0, list.length - 1));
		// }

		// let el = dfs(comments[4]);

		// const dfs = function (start, target) {
		// 	if (start.value === target) {
		// 		return start;
		// 	}
		// 	for (var i = 0; i < start.children.length; i++) {
		// 		var result = dfs(start.children[i], target);
		// 		if (result != null) {
		// 			return result;
		// 		}
		// 	}
		// 	return null;
		// };

		// console.log(`NESTING el`, el);
		// console.log(`NESTING LIST`, nesting(el));

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
					{comments.map((comment) => {
						if (comment.parentId) {
						} else {
							return (
								<ReadComment
									key={comment.id}
									comment={comment}
								/>
							);
						}
					})}
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
